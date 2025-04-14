import React, { useState, useRef, useEffect } from "react";
import { ArrowUpTrayIcon, CameraIcon } from '@heroicons/react/24/outline';

const CarbonCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  
  // Use the API key from environment variables with Vite's import.meta.env
  const apiKey = import.meta.env.VITE_GEMINI_KEY;

  // Carbon emission factors (kgCO2e per unit)
  const EMISSION_FACTORS = {
    ELECTRICITY: 0.85, // per kWh
    WATER: 0.419, // per m3
    GAS: 2.2, // per kg
    PETROL: 2.31, // per liter
    DIESEL: 2.68, // per liter
    PAPER: 0.93, // per kg
    PLASTIC: 6.0, // per kg
    MEAT: 15.0, // per kg (beef)
    DAIRY: 2.5, // per kg
    VEGETABLES: 0.5, // per kg
  };

  const handleImageSelected = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Create preview
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setFile(selectedFile);

    // Reset previous results
    setResults(null);
    setError(null);
  };

  const openCamera = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const extractJSONFromText = (text) => {
    try {
      // First try to find JSON between curly braces
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // If no JSON found or parsing failed
      throw new Error("No valid JSON found in response");
    } catch (err) {
      console.error("Error extracting JSON:", err);
      throw new Error("Failed to extract JSON from AI response");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select or take a photo of your bill first");
      return;
    }

    setLoading(true);

    try {
      // Convert file to base64
      const base64Image = await fileToBase64(file);

      // Prepare request to Gemini API
      const prompt = `
        Analyze this bill/receipt image and extract the following information:
        1. Bill type (electricity, water, gas, fuel, grocery, etc.)
        2. Items purchased (for grocery bills)
        3. Quantities and units for each item
        4. Total amount
        5. Date of transaction (if available)

        For utility bills (electricity, water, gas):
        - Extract the consumption amount and unit (kWh, m3, etc.)
        - Extract the billing period if available

        For fuel purchases:
        - Extract fuel type (petrol, diesel)
        - Extract quantity in liters

        For grocery bills:
        - List each item with quantity and unit (kg, g, L, etc.)
        - Categorize items (meat, dairy, vegetables, packaged goods)

        Return ONLY a JSON object with this exact format:
        {
          "bill_type": "type of bill",
          "items": [
            {
              "name": "item name",
              "quantity": numeric_quantity,
              "unit": "measurement unit",
              "category": "item category if applicable"
            }
          ],
          "total_amount": numeric_total,
          "currency": "currency code",
          "date": "date in YYYY-MM-DD format if available",
          "consumption": {
            "value": numeric_value,
            "unit": "consumption unit"
          } // for utility bills
        }
      `;

      // Make request to Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  {
                    inline_data: {
                      mime_type: file.type,
                      data: base64Image.split(",")[1],
                    },
                  },
                ],
              },
            ],
            generation_config: {
              temperature: 0.4,
              max_output_tokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${errorData.error?.message || response.statusText}`
        );
      }

      const data = await response.json();

      if (
        !data.candidates ||
        !data.candidates[0]?.content?.parts ||
        !data.candidates[0]?.content?.parts[0]?.text
      ) {
        throw new Error("Invalid response format from Gemini API");
      }

      // Get the response text
      const responseText = data.candidates[0].content.parts[0].text;
      console.log("Raw API response:", responseText);

      // Parse the JSON from the response
      const billData = extractJSONFromText(responseText);

      if (!billData || typeof billData !== "object") {
        throw new Error("Invalid response format from bill scanning");
      }

      // Calculate carbon emissions based on bill type
      const emissions = calculateCarbonEmissions(billData);

      setResults({
        billData,
        emissions,
      });
    } catch (err) {
      console.error("Error processing bill:", err);
      setError(err.message || "Failed to process bill");
    } finally {
      setLoading(false);
    }
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const calculateCarbonEmissions = (billData) => {
    let totalEmissions = 0;
    const emissionsBreakdown = [];

    switch (billData.bill_type.toLowerCase()) {
      case "electricity":
        if (billData.consumption?.unit?.toLowerCase() === "kwh") {
          const emissions =
            billData.consumption.value * EMISSION_FACTORS.ELECTRICITY;
          totalEmissions = emissions;
          emissionsBreakdown.push({
            item: "Electricity",
            quantity: billData.consumption.value,
            unit: "kWh",
            emissions,
            factor: EMISSION_FACTORS.ELECTRICITY,
          });
        }
        break;

      case "water":
        if (billData.consumption?.unit?.toLowerCase() === "m3") {
          const emissions = billData.consumption.value * EMISSION_FACTORS.WATER;
          totalEmissions = emissions;
          emissionsBreakdown.push({
            item: "Water",
            quantity: billData.consumption.value,
            unit: "m³",
            emissions,
            factor: EMISSION_FACTORS.WATER,
          });
        }
        break;

      case "gas":
      case "lpg":
      case "cng":
      case "natural gas":
        if (
          billData.consumption?.unit?.toLowerCase() === "kg" ||
          billData.consumption?.unit?.toLowerCase() === "m3"
        ) {
          // Assuming 1 m3 of natural gas ≈ 0.8 kg
          const quantity =
            billData.consumption.unit.toLowerCase() === "m3"
              ? billData.consumption.value * 0.8
              : billData.consumption.value;
          const emissions = quantity * EMISSION_FACTORS.GAS;
          totalEmissions = emissions;
          emissionsBreakdown.push({
            item: "Gas",
            quantity: billData.consumption.value,
            unit: billData.consumption.unit,
            emissions,
            factor: EMISSION_FACTORS.GAS,
          });
        }
        break;

      case "petrol":
      case "diesel":
        if (billData.items?.[0]?.unit?.toLowerCase() === "l") {
          const factor =
            billData.bill_type.toLowerCase() === "petrol"
              ? EMISSION_FACTORS.PETROL
              : EMISSION_FACTORS.DIESEL;
          const emissions = billData.items[0].quantity * factor;
          totalEmissions = emissions;
          emissionsBreakdown.push({
            item: billData.bill_type,
            quantity: billData.items[0].quantity,
            unit: "L",
            emissions,
            factor,
          });
        }
        break;

      case "grocery":
      case "food":
        if (billData.items && Array.isArray(billData.items)) {
          billData.items.forEach((item) => {
            let factor = 0;
            let effectiveQuantity = item.quantity;

            // Convert units to kg for food items
            if (
              item.unit &&
              ["g", "gram", "grams"].includes(item.unit.toLowerCase())
            ) {
              effectiveQuantity = item.quantity / 1000;
            }

            // Determine emission factor based on category
            if (item.category) {
              switch (item.category.toLowerCase()) {
                case "meat":
                case "beef":
                case "lamb":
                  factor = EMISSION_FACTORS.MEAT;
                  break;
                case "dairy":
                case "milk":
                case "cheese":
                  factor = EMISSION_FACTORS.DAIRY;
                  break;
                case "vegetables":
                case "fruits":
                case "produce":
                  factor = EMISSION_FACTORS.VEGETABLES;
                  break;
                case "plastic":
                case "packaging":
                  factor = EMISSION_FACTORS.PLASTIC;
                  break;
                case "paper":
                case "cardboard":
                  factor = EMISSION_FACTORS.PAPER;
                  break;
              }
            }

            if (factor > 0) {
              const emissions = effectiveQuantity * factor;
              totalEmissions += emissions;
              emissionsBreakdown.push({
                item: item.name,
                quantity: item.quantity,
                unit: item.unit,
                emissions,
                factor,
              });
            }
          });
        }
        break;

      default:
        throw new Error(`Unsupported bill type: ${billData.bill_type}`);
    }

    return {
      totalEmissions: parseFloat(totalEmissions.toFixed(2)), // kg CO2e
      emissionsBreakdown,
      equivalent: getEmissionEquivalents(totalEmissions),
    };
  };

  const getEmissionEquivalents = (kgCO2e) => {
    // Common equivalents to help understand the impact
    const kmByCar = (kgCO2e / 0.12).toFixed(1); // Avg car emits ~120g CO2e per km
    const treesNeeded = (kgCO2e / 21.77).toFixed(1); // Avg tree absorbs ~21.77kg CO2 per year
    const smartphonesCharged = (kgCO2e / 0.008).toFixed(0); // Avg smartphone charge

    return {
      kmByCar,
      treesNeeded,
      smartphonesCharged,
      description: `${kgCO2e} kg CO2e is equivalent to driving ${kmByCar} km by car, or charging ${smartphonesCharged} smartphones. It would take ${treesNeeded} trees one year to absorb this amount of CO2.`,
    };
  };

  // For demo/fallback purposes only - allows testing without API key
  const handleDemoMode = () => {
    setLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      const mockBillData = {
        bill_type: "electricity",
        total_amount: 85.45,
        currency: "USD",
        date: "2025-04-10",
        consumption: {
          value: 420,
          unit: "kWh",
        },
      };

      const emissions = calculateCarbonEmissions(mockBillData);

      setResults({
        billData: mockBillData,
        emissions,
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Carbon Footprint Calculator</h1>
        <p className="text-gray-600">Upload a bill or receipt to calculate its carbon footprint</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 p-6">
        <div className="space-y-4">
          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelected}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageSelected}
          />

          {/* Button controls */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={openFileDialog}
              className="flex items-center px-4 py-2 bg-[#14281D] text-white rounded-md hover:bg-[#3a5a40] transition-colors"
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Upload Bill
            </button>
            <button
              type="button"
              onClick={openCamera}
              className="flex items-center px-4 py-2 bg-[#588157] text-white rounded-md hover:bg-[#3a5a40] transition-colors"
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              Take Photo
            </button>
          </div>

          {/* Image preview */}
          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={previewUrl}
                alt="Bill preview"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}

          {/* Analysis buttons */}
          {previewUrl && (
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-4 py-2 bg-[#14281D] text-white rounded-md hover:bg-[#3a5a40] disabled:bg-gray-400 transition-colors"
              >
                {loading ? "Analyzing..." : "Analyze Bill"}
              </button>

              <button
                type="button"
                onClick={handleDemoMode}
                disabled={loading}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
              >
                Use Demo Mode
              </button>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Analysis Results</h2>

              <div className="mb-4">
                <p className="font-medium">
                  Bill Type:{" "}
                  <span className="text-gray-700">
                    {results.billData.bill_type}
                  </span>
                </p>
                {results.billData.date && (
                  <p className="font-medium">
                    Date:{" "}
                    <span className="text-gray-700">{results.billData.date}</span>
                  </p>
                )}
                <p className="font-medium">
                  Total:{" "}
                  <span className="text-gray-700">
                    {results.billData.total_amount}{" "}
                    {results.billData.currency || ""}
                  </span>
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-lg mb-2">Carbon Footprint</h3>
                <p className="text-2xl font-bold text-[#588157]">
                  {results.emissions.totalEmissions} kg CO2e
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {results.emissions.equivalent.description}
                </p>
              </div>

              {results.emissions.emissionsBreakdown.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-lg mb-2">Breakdown</h3>
                  <ul className="space-y-2">
                    {results.emissions.emissionsBreakdown.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {item.item} ({item.quantity} {item.unit})
                        </span>
                        <span className="font-medium">
                          {item.emissions.toFixed(2)} kg CO2e
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
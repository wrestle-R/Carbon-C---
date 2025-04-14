import React, { useState } from 'react';

const EmissionsForm = () => {
  const [formData, setFormData] = useState({
    source: '',
    facility: '',
    date: '',
    quantity: '',
    unit: 'kWh',
    notes: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form data submitted:', formData);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          source: '',
          facility: '',
          date: '',
          quantity: '',
          unit: 'kWh',
          notes: ''
        });
        setActiveStep(1);
      }, 3000);
    }, 1500);
  };

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#14281D] mb-2">Emissions Data Entry</h1>
        <p className="text-gray-600">Record your emissions data for accurate carbon footprint tracking</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
        {success ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#588157]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#14281D] mb-2">Data Submitted Successfully!</h3>
            <p className="text-gray-600">Your emissions data has been recorded.</p>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step < activeStep
                          ? 'bg-[#588157] text-white'
                          : step === activeStep
                          ? 'bg-[#14281D] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step < activeStep ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        step
                      )}
                    </div>
                    <div className="text-xs mt-2 font-medium text-gray-600">
                      {step === 1 && 'Details'}
                      {step === 2 && 'Quantity'}
                      {step === 3 && 'Review'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 h-1 w-full bg-gray-200 rounded"></div>
                <div 
                  className="absolute top-0 h-1 bg-[#588157] rounded" 
                  style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Source Details */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emission Source
                      </label>
                      <select
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#588157]"
                      >
                        <option value="">Select a source</option>
                        <option value="electricity">Electricity</option>
                        <option value="fuel">Fuel Consumption</option>
                        <option value="transportation">Transportation</option>
                        <option value="waste">Waste</option>
                        <option value="manufacturing">Manufacturing Process</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facility Location
                      </label>
                      <select
                        name="facility"
                        value={formData.facility}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#588157]"
                      >
                        <option value="">Select a facility</option>
                        <option value="main_factory">Main Factory</option>
                        <option value="office_hq">Office HQ</option>
                        <option value="distribution_center">Distribution Center</option>
                        <option value="retail_stores">Retail Stores</option>
                        <option value="data_center">Data Center</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Activity
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#588157]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#14281D] text-white px-6 py-2 rounded-md hover:bg-[#3a5a40] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Quantity Details */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#588157]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#588157]"
                      >
                        <option value="kWh">Kilowatt-hours (kWh)</option>
                        <option value="liters">Liters</option>
                        <option value="kg">Kilograms (kg)</option>
                        <option value="km">Kilometers (km)</option>
                        <option value="miles">Miles</option>
                        <option value="m3">Cubic Meters (m³)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#588157]"
                      placeholder="Add any additional information here..."
                    ></textarea>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#14281D] text-white px-6 py-2 rounded-md hover:bg-[#3a5a40] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review and Submit */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium text-lg text-[#14281D] mb-4">Review Your Submission</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Emission Source</p>
                        <p className="font-medium">
                          {formData.source.charAt(0).toUpperCase() + formData.source.slice(1)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Facility</p>
                        <p className="font-medium">
                          {formData.facility.replace(/_/g, ' ').split(' ').map(
                            word => word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{formData.date}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-medium">{formData.quantity} {formData.unit}</p>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="font-medium">{formData.notes || 'None'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`px-6 py-2 rounded-md text-white ${
                        submitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#588157] hover:bg-[#3a5a40] transition-colors'
                      }`}
                    >
                      {submitting ? 'Submitting...' : 'Submit Data'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-[#14281D] mb-4">Quick Tips</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#588157]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-700">
                Be sure to select the correct unit of measurement for accurate carbon calculations.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#588157]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-700">
                For electricity, use your monthly statements to find the exact kWh used.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#588157]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-700">
                You can upload multiple entries by using our bulk upload option on the Reports page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionsForm;
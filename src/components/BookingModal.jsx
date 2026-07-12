import React, { useState } from 'react';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device: '',
    service: 'Screen Repair',
    repairType: 'walk-in', // walk-in or mail-in
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectRepairType = (type) => {
    setFormData((prev) => ({ ...prev, repairType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the WhatsApp message text
    const textMessage = `Hello Applifix! I'd like to book a repair:
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Device:* ${formData.device}
*Service:* ${formData.service}
*Repair Type:* ${formData.repairType === 'walk-in' ? 'Walk-in (Patiala Center)' : 'Mail-in (Courier)'}`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/917986863776?text=${encodedText}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Book a Repair</h2>
          <p className="modal-desc">Fill in details. We will contact you immediately via WhatsApp to schedule your repair.</p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone / WhatsApp Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="device">Device Model</label>
            <input
              type="text"
              id="device"
              name="device"
              className="form-input"
              placeholder="e.g. iPhone 14 Pro, Apple Watch Ultra"
              value={formData.device}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="service">Service Required</label>
            <select
              id="service"
              name="service"
              className="form-select"
              value={formData.service}
              onChange={handleChange}
            >
              <option value="Screen Repair">Screen / Glass Replacement</option>
              <option value="Battery Replacement">Battery Replacement</option>
              <option value="Face ID Repair">Face ID Repair</option>
              <option value="Back Glass Repair">Back Glass Replacement</option>
              <option value="Charging Port Repair">Charging Port Repair</option>
              <option value="Water Damage Repair">Water Damage Repair</option>
              <option value="Watch Repair">Apple Watch Outer Glass Repair</option>
              <option value="Other">Other Issues</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Repair Option</label>
            <div className="form-options-row">
              <div 
                className={`form-radio-card ${formData.repairType === 'walk-in' ? 'active' : ''}`}
                onClick={() => selectRepairType('walk-in')}
              >
                <input 
                  type="radio" 
                  name="repairType" 
                  value="walk-in"
                  checked={formData.repairType === 'walk-in'}
                  onChange={() => {}}
                />
                <span className="radio-card-title">Walk-In Repair</span>
                <span className="radio-card-desc">Visit our Patiala Service Centre</span>
              </div>

              <div 
                className={`form-radio-card ${formData.repairType === 'mail-in' ? 'active' : ''}`}
                onClick={() => selectRepairType('mail-in')}
              >
                <input 
                  type="radio" 
                  name="repairType" 
                  value="mail-in"
                  checked={formData.repairType === 'mail-in'}
                  onChange={() => {}}
                />
                <span className="radio-card-title">Mail-In Courier</span>
                <span className="radio-card-desc">Ship your device from anywhere in India</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Confirm Booking on WhatsApp
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.244 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.875-6.973-1.856-1.859-4.335-2.88-6.972-2.882-5.437 0-9.863 4.42-9.867 9.864-.001 1.73.457 3.418 1.328 4.908l-.307 1.12 1.157-.303zm12.385-6.666c-.302-.152-1.785-.881-2.062-.982-.277-.1-.478-.151-.679.151-.202.302-.782.982-.958 1.184-.176.201-.352.226-.654.075-.302-.15-1.274-.47-2.427-1.498-.897-.8-1.502-1.788-1.678-2.09-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.529.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.679-1.637-.93-2.24-.245-.589-.494-.509-.679-.518-.176-.008-.377-.01-.578-.01-.201 0-.528.075-.805.377-.277.302-1.057 1.03-1.057 2.512 0 1.483 1.082 2.915 1.232 3.116.15.201 2.13 3.253 5.16 4.562.72.311 1.282.497 1.721.637.724.23 1.382.197 1.902.12.58-.087 1.785-.73 2.037-1.435.252-.704.252-1.307.176-1.433-.076-.127-.277-.202-.579-.353z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

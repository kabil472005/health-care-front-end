export const fetchPatients = async () => {
  // Mock data for testing
  return [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
};

export const fetchDoctors = async () => {
  // Mock data for testing
  return [
    { id: 1, name: 'Dr. Smith', specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Jane', specialization: 'Neurology' }
  ];
};

export const createAppointment = async (appointmentData) => {
  // Mock implementation for testing
  return {};
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  // Mock implementation for testing
  return {};
};

export const fetchAppointmentsByPatient = async (patientId) => {
  // Mock implementation for testing
  if (patientId === '1') {
    return [
      {
        id: 101,
        patient: 1,
        doctor: 1,
        appointmentDate: '2099-12-25',
        appointmentTime: '09:00',
        reason: 'General Checkup',
        status: 'REQUESTED'
      },
      {
        id: 102,
        patient: 1,
        doctor: 2,
        appointmentDate: '2099-12-26',
        appointmentTime: '10:30',
        reason: 'Follow-up',
        status: 'APPROVED'
      }
    ];
  }
  return [];
};
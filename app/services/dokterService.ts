export const fetchDoctorsBySpecialization = async (specialization: string) => {
    try {
      const response = await fetch(
        'https://dopamine-7546c-default-rtdb.asia-southeast1.firebasedatabase.app/doctors.json'
      );
      const data = await response.json();
  
      // Filter dokter berdasrkan spesialis
      const filteredDoctors = Object.values(data).filter(
        (doctor: any) => doctor.specialty === specialization
      );
  
      return filteredDoctors;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  };
  
// https://restcountries.com/v3.1/all

// get all countries
export const getAllCountries = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/countries`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// get country by name
export const getCountryByName = async (name: string) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await response.json();
    console.log('data: ' + data);

    return data;
  } catch (error) {
    console.error('Error fetching country:', error);
    throw error;
  }
};

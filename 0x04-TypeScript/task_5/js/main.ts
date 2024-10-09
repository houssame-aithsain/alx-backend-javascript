// main.ts

// Define the MajorCredits interface with a credits property and a brand
interface MajorCredits {
    credits: number;
    brand: 'Major';
  }
  
  // Define the MinorCredits interface with a credits property and a brand
  interface MinorCredits {
    credits: number;
    brand: 'Minor';
  }
  
  // Function to sum major credits
  function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
    return {
      credits: subject1.credits + subject2.credits,
      brand: 'Major',
    };
  }
  
  // Function to sum minor credits
  function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
    return {
      credits: subject1.credits + subject2.credits,
      brand: 'Minor',
    };
  }
  
  // Example usage:
  const major1: MajorCredits = { credits: 30, brand: 'Major' };
  const major2: MajorCredits = { credits: 20, brand: 'Major' };
  const totalMajor = sumMajorCredits(major1, major2);
  console.log(totalMajor); // Output: { credits: 50, brand: 'Major' }
  
  const minor1: MinorCredits = { credits: 10, brand: 'Minor' };
  const minor2: MinorCredits = { credits: 5, brand: 'Minor' };
  const totalMinor = sumMinorCredits(minor1, minor2);
  console.log(totalMinor); // Output: { credits: 15, brand: 'Minor' }
  
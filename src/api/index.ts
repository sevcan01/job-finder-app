export const fetchJobListings = async (): Promise<any[]> => {
    const response = await fetch('https://novel-project-ntj8t.ampt.app/jobs');
    if (!response.ok) {
      throw new Error('Failed to fetch job listings');
    }
    return response.json();
  };
  
  export const applyForJob = async (jobId: string): Promise<any> => {
    const response = await fetch(`https://novel-project-ntj8t.ampt.app/jobs/${jobId}/apply`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to apply for job');
    }
    return response.json();
  };
  
  export const withdrawApplication = async (jobId: string): Promise<any> => {
    const response = await fetch(`https://novel-project-ntj8t.ampt.app/jobs/${jobId}/withdraw`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to withdraw application');
    }
    return response.json();
  };
  
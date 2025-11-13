import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Job Details</h1>
        <p className="text-gray-600">Viewing details for job ID: {id}</p>
      </div>
    </div>
  );
};

export default JobDetails;

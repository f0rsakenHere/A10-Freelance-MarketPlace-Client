import { useParams } from "react-router-dom";

const UpdateJob = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Update Job</h1>
        <p className="text-gray-600">Update job with ID: {id}</p>
      </div>
    </div>
  );
};

export default UpdateJob;

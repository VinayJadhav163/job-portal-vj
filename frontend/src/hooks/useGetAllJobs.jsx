import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useGetAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchAllJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please log in.");
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:8000/api/v1/job/get", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Correct string interpolation
              },
          });

      if (res.data.success) {
        setJobs(res.data.jobs);
      } else {
        toast.error("Something went wrong while fetching jobs.");
      }
    } catch (error) {
      console.error("fetchAllJobs error:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
        navigate("/login");
      } else {
        toast.error("Error fetching jobs. Try again later.");
      }
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return jobs;
};

export default useGetAllJobs;

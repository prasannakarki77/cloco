import UserTable from "@/components/dashboard/UserTable";
import { API_URL } from "@/lib/utils";
import { User } from "@/types";
import React, { useState, useEffect } from "react";

const UserTabContent = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(API_URL + "/user/get-all");
        const data: User[] = await response.json();
        setUsersData(data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <UserTable data={usersData} />
    </div>
  );
};

export default UserTabContent;

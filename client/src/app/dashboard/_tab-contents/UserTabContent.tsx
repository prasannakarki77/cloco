import UserTable from "@/components/dashboard/UserTable";
import { Card } from "@/components/ui/card";
import { API_URL } from "@/lib/utils";
import { User } from "@/types";
import axios from "axios";
import React, { useState, useEffect } from "react";

const UserTabContent = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserTableData = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/get-all`);
        setUsersData(res.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserTableData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <UserTable data={usersData} />
    </Card>
  );
};

export default UserTabContent;

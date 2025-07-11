"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { invalidateProjectsCache } from "@/lib/actions";

const TrackProjectId = ({ projectId }: { projectId: string }) => {
  const [currentProjectId, setcurrentProjectId] = useState(projectId);

  useEffect(() => {
    const checkValidateQuery = async () => {
      const cookieProjectId = Cookies.get("projectId");
      if (cookieProjectId !== projectId) {
        await invalidateProjectsCache()
        Cookies.set("projectId", projectId);
      } else {
        Cookies.set("projectId", projectId);
      }
    }
    checkValidateQuery()
  }, [projectId]);

  Cookies.set("currentProjectId", currentProjectId);
  return <></>;
};

export default TrackProjectId;

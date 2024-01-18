import TicketForm from "@/components/TicketForm";
import React from "react";

const getTicketById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}api/Tickets/${id}`,
      {
        cache: "no-store",
      }
    );

    console.log("res", res);

    if (!res.ok) {
      throw new Error("Failed to get ticket.");
    }

    const data = await res.json();
    console.log("res json", data);

    return data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
    console.log(updateTicketData);
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return (
    <>
      <h1>{params.id}</h1>
      <TicketForm ticket={updateTicketData} />
    </>
  );
};

export default TicketPage;

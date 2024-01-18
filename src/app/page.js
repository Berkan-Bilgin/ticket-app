import TicketCard from "@/components/TicketCard";
import React from "react";

const getTickets = async () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = await fetch(`${url}api/Tickets`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <div className=" p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

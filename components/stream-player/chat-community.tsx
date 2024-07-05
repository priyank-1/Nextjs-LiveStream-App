"use client";

import { useParticipants } from "@livekit/components-react";
import React, { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

export const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const participants = useParticipants();
  const value = "";
  const [debouncedValue, updateDebouncedValue] = useDebounceValue(value, 500, {
    leading: true,
  });

  const onChange = (newValue: string) => {
    updateDebouncedValue(value);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant);
        }
        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[]
    );

    const final_deduped = deduped.filter((participant) => {
      return participant?.name
        ?.toLowerCase()
        .includes(debouncedValue.toString().toLowerCase());
    });
    return final_deduped;
  }, [participants, debouncedValue]);

  // console.log('Participants:', JSON.stringify(participants, null, 2));
  // console.log('Deduped Participants:', JSON.stringify(filteredParticipants, null, 2));

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div
          className=" text-sm text-muted-foreground
        "
        >
          Community is Disabled
        </div>
        {/* {participants.map((participant) => (
               <div key={Math.random()}>
       
                   {JSON.stringify(participant)}
                   </div>
           ))}
            */}
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <Input
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search Community"
          className="border-white/10"
        />

        <ScrollArea className=" gap-y-2 mt-4">
          <p
            className="text-center text-sm text-muted-foreground hidden
            last:block p-2"
          >
            {filteredParticipants.map((participant) => (
              <CommunityItem
                key={participant.identity}
                hostName={hostName}
                viewerName={viewerName}
                participantName={participant.name}
                participantIdentity={participant.identity}
              />
            ))}
          </p>
        </ScrollArea>
      </div>
    );
  }
};

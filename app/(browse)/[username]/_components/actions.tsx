"use client";
import { onBlock,onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username} `)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  
  // api less for mutation


  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have Unfollowed ${data.following.username} `)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if(isFollowing){
      handleUnfollow();
    }
    else{
      handleFollow();
    }
  }

const handleBlock = () => {
  startTransition(() => {
    onUnblock(userId).then((data) => toast.success(`Blocked the User ${data?.blocked.username}`))
    .catch(() => toast.error("Something went wrong"));
  }
)
}


  return (

    
   <>
    <Button
      disabled={ isPending}
      onClick={onClick}
      variant="primary"
    >
      {isFollowing ? "Unfollow" : "Follow" }
    </Button>


    <Button onClick={handleBlock} disabled = {isPending}>
      Block
    </Button>
    </>
  );
};

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

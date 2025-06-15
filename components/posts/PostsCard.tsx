"use client";

import { useState } from "react";
import { Heart, Bookmark, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Post as PostType } from "@/types/post";

interface PostCardProps {
  post: PostType;
}

export default function PostCard({ post: initialPost }: PostCardProps) {
  const [post, setPost] = useState(initialPost);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setPost((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes.slice(0, -1) : [...prev.likes, "you"],
    }));
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    setPost((prev) => ({
      ...prev,
      savedBy: isSaved ? prev.savedBy.slice(0, -1) : [...prev.savedBy, "you"],
    }));
  };

  const handleComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      _id: Date.now().toString(),
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
      user: {
        _id: "you",
        username: "You",
        phoneNumber: "0000000000",
      },
    };

    setPost((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
    setCommentText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  const authorUsername = post.author?.username || "Unknown";

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full max-w-lg">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border overflow-hidden transition-all hover:shadow-xl">
          <div className="p-6 pb-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-10 h-10 ring-2 ring-white shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {authorUsername.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-900">{authorUsername}</p>
                <p className="text-sm text-slate-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-slate-900">{post.content}</h1>
            </div>

            {/* Like / Comment / Save */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-6">
                {/* Like */}
                <button onClick={handleLike} className="group flex items-center gap-2 hover:scale-105 transition">
                  <div className={`p-2 rounded-full ${isLiked ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-600 group-hover:bg-red-50 group-hover:text-red-500"}`}>
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : "group-hover:scale-110"}`} />
                  </div>
                  <span className={`font-medium ${isLiked ? "text-red-500" : "text-slate-600"}`}>
                    {post.likes.length}
                  </span>
                </button>

                {/* Comment */}
                <button onClick={() => setShowComments(!showComments)} className="group flex items-center gap-2 hover:scale-105 transition">
                  <div className="p-2 rounded-full bg-slate-50 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-500">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110" />
                  </div>
                  <span className="font-medium text-slate-600 group-hover:text-blue-500">
                    {post.comments.length}
                  </span>
                </button>
              </div>

              {/* Save */}
              <button onClick={handleSave} className="group transition hover:scale-105">
                <div className={`p-2 rounded-full ${isSaved ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 group-hover:bg-slate-900 group-hover:text-white"}`}>
                  <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : "group-hover:scale-110"}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Comment Input */}
          <div className="px-6 pb-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border focus-within:border-blue-300 focus-within:bg-white transition">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-600 text-white font-semibold text-sm">
                  Y
                </AvatarFallback>
              </Avatar>
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a comment..."
                className="border-0 bg-transparent focus-visible:ring-0 placeholder:text-slate-400"
              />
              <Button
                onClick={handleComment}
                disabled={!commentText.trim()}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && post.comments.length > 0 && (
            <div className="px-6 pb-6 space-y-3">
              {post.comments.map((comment) => (
                <div key={comment._id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border hover:bg-slate-100 transition">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white font-semibold text-sm">
                      {comment.user.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-900 text-sm">{comment.user.username || "User"}</p>
                      <p className="text-xs text-slate-500">{new Date(comment.timestamp).toLocaleString()}</p>
                    </div>
                    <p className="text-slate-700 text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

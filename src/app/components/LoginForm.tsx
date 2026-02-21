"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./LoginForm.module.css";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>){  
    e.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({email, password});
      setLoading(false);
      
      if(error)
        alert(error.message);
      else
        router.push("/home"); 
  }

  //updates email state each time user types
  //when onClick is clicked, it calls the sign in function
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {/*<form onSubmit={handleLogin}>*/}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value = {email}
                  onChange={(e)=>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex w-full items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required
                  value = {password}
                  onChange={(e)=>
                    setPassword(e.target.value)
                  }
                  />
              </div>
            </div>
        </CardContent>
        <form onSubmit={handleLogin}>
          <CardFooter className="flex-col gap-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: "google",
                });
              }}
              >
              Login with Google
            </Button>
          </CardFooter>
          </form>
      </Card>
    </div>
  );
}

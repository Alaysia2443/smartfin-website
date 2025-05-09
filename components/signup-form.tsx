"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"

export default function SignupForm() {
  const router = useRouter()
  const { signup } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isWaitlist, setIsWaitlist] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isWaitlist) {
        // Handle waitlist signup
        toast({
          title: "Waitlist Signup Successful!",
          description: "You've been added to our waitlist. We'll notify you when we launch!",
          duration: 5000,
        })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
      } else {
        // Handle full signup
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match")
        }

        console.log('signup form flag');

        await signup(formData.email, formData.password, formData.firstName, formData.lastName)

        toast({
          title: "Account created!",
          description: "You've successfully signed up for SmartFin.",
          duration: 5000,
        })

        router.push("/rewards")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {!isWaitlist && (
          <>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required={!isWaitlist}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isWaitlist}
              />
            </div>
          </>
        )}
        <div className="pt-2">
          <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white" disabled={isLoading}>
            {isLoading ? "Processing..." : isWaitlist ? "Join Waitlist" : "Sign Up"}
          </Button>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="text-primary-500 hover:underline text-sm"
            onClick={() => setIsWaitlist(!isWaitlist)}
          >
            {isWaitlist ? "Create a full account instead" : "Just join the waitlist"}
          </button>
        </div>
      </form>
    </div>
  )
}

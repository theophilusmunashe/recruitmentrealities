"use client"
import clsx from "clsx"
import type React from "react"

import { useRef, useState, useEffect } from "react"

type InputForm = {
  formAction?: (data: FormData) => Promise<{ success: true } | { success: false; error: string }>
  buttonCopy: {
    success: string
    idle: string
    loading: string
  }
}

type State = "idle" | "loading" | "success" | "error"

const STATES: Record<State, State> = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
}

type UserType = "job-seeker" | "hr-expert" | "recruiter" | ""

export function InputForm({ formAction, buttonCopy }: InputForm) {
  const [state, setState] = useState<State>(STATES.idle)
  const [error, setError] = useState<string>()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [userType, setUserType] = useState<UserType>("")
  const errorTimeout = useRef<NodeJS.Timeout | null>(null)

  // Auto-reset success state back to idle after 2 seconds
  useEffect(() => {
    if (state === STATES.success) {
      const resetTimeout = setTimeout(() => {
        setState(STATES.idle)
      }, 2000)

      return () => clearTimeout(resetTimeout)
    }
  }, [state])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    if (state === STATES.success || state === STATES.loading) return
    if (errorTimeout.current) {
      clearTimeout(errorTimeout.current)
      setError(undefined)
      setState(STATES.idle)
    }
    if (formAction && typeof formAction === "function") {
      try {
        setState(STATES.loading)
        const data = await formAction(new FormData(formEl))

        if (data.success) {
          setState(STATES.success)

          formEl.reset()
          setEmail("")
          setPhone("")
          setUserType("")
        } else {
          setState(STATES.error)
          setError(data.error)
          errorTimeout.current = setTimeout(() => {
            setError(undefined)
            setState(STATES.idle)
          }, 3000)
        }
      } catch (error) {
        setState(STATES.error)
        setError("There was an error while submitting the form")
        console.error(error)
        errorTimeout.current = setTimeout(() => {
          setError(undefined)
          setState(STATES.idle)
        }, 3000)
      }
    }
  }
  const isSubmitted = state === "success"
  const inputDisabled = state === "loading"

  const userTypeOptions = [
    { value: "job-seeker" as const, label: "Job Seeker", icon: "💼" },
    { value: "hr-expert" as const, label: "HR Expert/Pro", icon: "👨‍💼" },
    { value: "recruiter" as const, label: "Recruiter", icon: "🎯" },
  ]

  return (
    <form className="flex flex-col gap-4 w-full relative" onSubmit={handleSubmit}>
      {/* Email Input */}
      <div className="flex items-center justify-between gap-3 relative">
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          className={clsx(
            "flex-1 text-sm pl-4 pr-4 py-2 h-11 bg-gray-11/5 cursor-text rounded-full text-gray-12 placeholder:text-gray-9 border border-gray-11/10",
          )}
          disabled={inputDisabled}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          data-1p-ignore
          data-lpignore
          autoFocus
        />
      </div>
      
      {/* Phone Input */}
      <div className="flex items-center justify-between gap-3 relative">
        <input
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          required
          value={phone}
          className={clsx(
            "flex-1 text-sm pl-4 pr-4 py-2 h-11 bg-gray-11/5 cursor-text rounded-full text-gray-12 placeholder:text-gray-9 border border-gray-11/10",
          )}
          disabled={inputDisabled}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          data-1p-ignore
          data-lpignore
        />
      </div>

      {/* User Type Selection */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-11 font-medium">I am a:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {userTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setUserType(option.value)}
              disabled={inputDisabled}
              className={clsx(
                "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium",
                "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                userType === option.value
                  ? "border-gray-12 bg-gray-12 text-gray-1 shadow-lg"
                  : "border-gray-11/20 bg-gray-11/5 text-gray-12 hover:border-gray-11/40 hover:bg-gray-11/10",
                inputDisabled && "opacity-50 cursor-not-allowed hover:scale-100"
              )}
            >
              <span className="text-lg">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        <input
          type="hidden"
          name="userType"
          value={userType}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={inputDisabled || !userType}
        className={clsx(
          "w-full h-12 px-6 bg-gray-12 text-gray-1 text-sm rounded-full font-medium flex gap-2 items-center justify-center transition-all duration-200",
          "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
          {
            "bg-gray-12 text-gray-2": state === "loading",
          }
        )}
      >
        {state === "loading" ? (
          <>
            {buttonCopy.loading}
            <Loading />
          </>
        ) : isSubmitted ? (
          buttonCopy.success
        ) : (
          buttonCopy.idle
        )}
      </button>
      
      <div className="w-full h-2" />
      {error && <p className="absolute text-xs text-[#ff0000] top-full -translate-y-1/2 px-2">{error}</p>}
    </form>
  )
}

const Loading = () => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded-full border border-[currentColor] !border-t-[transparent] animate-spin" />
  </div>
)

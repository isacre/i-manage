"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="px-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-9xl font-bold text-gray-800 dark:text-gray-200">404</h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">Oops! Page not found</h2>
          <p className="mx-auto mb-8 max-w-md text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            onClick={() => router.push("/")}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 hover:shadow-xl"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    </div>
  )
}

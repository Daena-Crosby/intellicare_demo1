"use client"

import { useEffect } from "react"
import * as faceapi from "face-api.js"

const modelPath = "/models"

const faceCache = new Map<string, number>() // cache face Y positions

export function useAutoFaceCrop(imgRef: React.RefObject<HTMLImageElement>) {
  useEffect(() => {
    if (!imgRef.current) return

    const img = imgRef.current

    async function loadModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath)
    }

    async function detectFace() {
      if (!img) return

      // If this image already analyzed → use cached value
      if (faceCache.has(img.src)) {
        const cached = faceCache.get(img.src)
        img.style.objectPosition = `center ${cached}%`
        return
      }

      // Wait for image to fully load
      if (!img.complete) {
        img.onload = detectFace
        return
      }

      const detection = await faceapi.detectSingleFace(
        img,
        new faceapi.TinyFaceDetectorOptions()
      )

      if (!detection) return // fall back to normal centering

      const { box } = detection
      const imgHeight = img.naturalHeight

      // Calculate the vertical center of the detected face
      const faceCenterPercent = ((box.y + box.height / 2) / imgHeight) * 100

      // Cache result for future renders
      faceCache.set(img.src, faceCenterPercent)

      // Apply repositioning
      img.style.transition = "object-position 0.4s ease"
      img.style.objectPosition = `center ${faceCenterPercent}%`
    }

    loadModels().then(detectFace)
  }, [imgRef])
}

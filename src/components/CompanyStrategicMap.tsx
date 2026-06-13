import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/** Dubai Silicon Oasis — AULM / IFZA desk */
const OFFICE: L.LatLngExpression = [25.1198, 55.3848]
/** Zoom 11 — wider Dubai context; pinch/scroll to zoom in */
const INITIAL_ZOOM = 11

type Props = {
  className?: string
}

export function CompanyStrategicMap({ className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || mapRef.current) return

    const map = L.map(container, {
      center: OFFICE,
      zoom: INITIAL_ZOOM,
      scrollWheelZoom: true,
      zoomControl: true,
      attributionControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    L.circleMarker(OFFICE, {
      radius: 7,
      color: '#111',
      weight: 2,
      fillColor: '#111',
      fillOpacity: 1,
    })
      .bindTooltip('Dubai Silicon Oasis', { direction: 'top', offset: [0, -8] })
      .addTo(map)

    mapRef.current = map

    const ro = new ResizeObserver(() => map.invalidateSize())
    ro.observe(container)

    return () => {
      ro.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`company-strategic-map ${className}`.trim()}
      role="application"
      aria-label="Interactive map of Dubai — AULM at Dubai Silicon Oasis"
    />
  )
}

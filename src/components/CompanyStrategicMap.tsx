import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

/** Dubai Silicon Oasis — Dubai Digital Park / IFZA */
const CENTER: [number, number] = [55.3848, 25.1198]
const ZOOM = 12.4
const STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

type Props = {
  className?: string
}

export function CompanyStrategicMap({ className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    const mountMap = () => {
      if (cancelled || mapRef.current || !containerRef.current) return

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: STYLE,
        center: CENTER,
        zoom: ZOOM,
        bearing: 0,
        pitch: 0,
        interactive: false,
        attributionControl: false,
      })

      mapRef.current = map

      map.on('load', () => {
        map.resize()
        new maplibregl.Marker({ color: '#111', scale: 0.85 }).setLngLat(CENTER).addTo(map)
        map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left')
      })
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        mountMap()
        io.disconnect()
      },
      { threshold: 0.15, rootMargin: '40px' },
    )

    io.observe(container)

    const ro = new ResizeObserver(() => {
      mapRef.current?.resize()
    })
    ro.observe(container)

    return () => {
      cancelled = true
      io.disconnect()
      ro.disconnect()
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`company-strategic-map ${className}`.trim()}
      role="img"
      aria-label="Map centred on Dubai Silicon Oasis"
    />
  )
}

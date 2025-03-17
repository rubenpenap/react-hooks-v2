import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import VanillaTilt from 'vanilla-tilt'

interface HTMLVanillaTiltElement extends HTMLDivElement {
	vanillaTilt?: VanillaTilt
}

function Tilt({
	children,
	max = 25,
	speed = 400,
	glare = true,
	maxGlare = 0.5,
}: Readonly<{
	children: React.ReactNode
	max?: number
	speed?: number
	glare?: boolean
	maxGlare?: number
}>) {
	const tiltRef = useRef<HTMLVanillaTiltElement>(null)

	const vanillaTiltOptions = {
		max,
		speed,
		glare,
		'max-glare': maxGlare,
	}

	useEffect(() => {
		if (!tiltRef.current) return
		VanillaTilt.init(tiltRef.current, vanillaTiltOptions)
		return () => tiltRef.current?.vanillaTilt?.destroy()
	}, [])

	return (
		<div className="tilt-root" ref={tiltRef}>
			<div className="tilt-child">{children}</div>
		</div>
	)
}

function App() {
	const [showTilt, setShowTilt] = useState(true)
	const [count, setCount] = useState(0)
	const [options, setOptions] = useState({
		max: 25,
		speed: 400,
		glare: true,
		maxGlare: 0.5,
	})
	return (
		<div>
			<button onClick={() => setShowTilt((s) => !s)}>Toggle Visibility</button>
			{showTilt ? (
				<div className="app">
					<form
						onSubmit={(e) => e.preventDefault()}
						onChange={(event) => {
							const formData = new FormData(event.currentTarget)
							setOptions({
								max: Number(formData.get('max')),
								speed: Number(formData.get('speed')),
								glare: formData.get('glare') === 'on',
								maxGlare: Number(formData.get('maxGlare')),
							})
						}}
					>
						<div>
							<label htmlFor="max">Max:</label>
							<input id="max" name="max" type="number" defaultValue={25} />
						</div>
						<div>
							<label htmlFor="speed">Speed:</label>
							<input id="speed" name="speed" type="number" defaultValue={400} />
						</div>
						<div>
							<label>
								<input id="glare" name="glare" type="checkbox" defaultChecked />{' '}
								Glare
							</label>
						</div>
						<div>
							<label htmlFor="maxGlare">Max Glare:</label>
							<input
								id="maxGlare"
								name="maxGlare"
								type="number"
								defaultValue={0.5}
							/>
						</div>
					</form>
					<br />
					<Tilt {...options}>
						<div className="totally-centered">
							<button
								className="count-button"
								onClick={() => setCount((c) => c + 1)}
							>
								{count}
							</button>
						</div>
					</Tilt>
				</div>
			) : null}
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
createRoot(rootEl).render(<App />)

// 🤫 we'll fix this in the next step!
// (ALMOST) NEVER DISABLE THIS LINT RULE IN REAL LIFE!
/*
eslint
	react-hooks/exhaustive-deps: "off",
*/

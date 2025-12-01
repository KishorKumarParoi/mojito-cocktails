import React from 'react'
import { sliderLists as allCockTails } from '../constants/index.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {
    const contentRef = React.useRef(null)
    const [currentIndex, setCurrentIndex] = React.useState(0)

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('#title',
                { opacity: 0 },
                { opacity: 1, duration: 0.6 })

            gsap.fromTo('.cocktail img',
                { opacity: 0, xPercent: -30 },
                { xPercent: 0, opacity: 1, duration: 0.6, ease: 'power1.out' })

            gsap.fromTo('.details h2',
                { opacity: 0, yPercent: 30 },
                { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power1.out' })

            gsap.fromTo('.details p',
                { opacity: 0, yPercent: 30 },
                { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power1.out', delay: 0.05 })
        })
        return () => ctx.revert()
    }, [currentIndex])

    const totalCocktails = allCockTails.length

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails
        setCurrentIndex(newIndex)
    }

    const getCocktailAt = (offset) =>
        allCockTails[(currentIndex + offset + totalCocktails) % totalCocktails]

    const currentCocktail = getCocktailAt(0)
    const nextCocktail = getCocktailAt(1)
    const prevCocktail = getCocktailAt(-1)

    return (
        <section id='menu' aria-labelledby='menu-heading' className='relative'>
            <img src='/images/slider-left-leaf.png' alt='left-leaf' id='m-left-leaf' />
            <img src='/images/slider-right-leaf.png' alt='right-leaf' id='m-right-leaf' />

            <h2 id='menu-heading' className='sr-only'>Cocktail Menu</h2>

            <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
                {allCockTails.map((cocktail, index) => {
                    const isActive = index === currentIndex
                    return (
                        <button
                            key={cocktail.id}
                            type='button'
                            className={`px-3 py-1 border transition-colors ${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'
                                }`}
                            onClick={() => goToSlide(index)}
                            aria-current={isActive ? 'true' : 'false'}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>

            {/* Arrows positioned at left/right edges */}
            <div className='absolute inset-0 pointer-events-none'>
                <button
                    type='button'
                    onClick={() => goToSlide(currentIndex - 1)}
                    className='pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-start gap-1 text-left'
                    aria-label={`Previous: ${prevCocktail.name}`}
                >
                    <span className='text-xs opacity-70'>{prevCocktail.name}</span>
                    <img src='/images/right-arrow.png' alt='' aria-hidden='true' />
                </button>

                <button
                    type='button'
                    onClick={() => goToSlide(currentIndex + 1)}
                    className='pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1 text-right'
                    aria-label={`Next: ${nextCocktail.name}`}
                >
                    <span className='text-xs opacity-70'>{nextCocktail.name}</span>
                    <img src='/images/left-arrow.png' alt='' aria-hidden='true' />
                </button>
            </div>

            <div className='cocktail'>
                <img src={currentCocktail.image} className='object-contain' alt={currentCocktail.name} />
            </div>

            <div className='recipe px-40'>
                <div ref={contentRef} className='info'>
                    <p>Recipe for:</p>
                    <p id='title'>{currentCocktail.name}</p>
                </div>
                <div className='details'>
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>
                </div>
            </div>
        </section>
    )
}

export default Menu
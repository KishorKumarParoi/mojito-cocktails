import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(SplitText, ScrollTrigger)

const Hero = () => {
    const videoRef = useRef(null)
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars, words' })
        const paraSplit = new SplitText('.subtitle', { type: 'lines' })

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.06,
        })

        gsap.from(paraSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.07,
            delay: 0.8,
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', { yPercent: 200 }, 0)
            .to('.left-leaf', { yPercent: -200 }, 0)

        const startValue = isMobile ? "top 50%" : "center 60%"
        const endValue = isMobile ? "120% top" : "bottom top"

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })

        videoRef.current.onloadmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }

    }, [])

    return (
        <>
            <section id='hero' className='noisy'>
                <h1 className='title'>MOJITO</h1>

                <img
                    src='/images/hero-left-leaf.png'
                    alt='left-leaf'
                    className='left-leaf'
                />

                <img
                    src='/images/hero-right-leaf.png'
                    alt='right-leaf'
                    className='right-leaf'
                />

                <section className='body'>
                    <div className='content'>
                        <div className='space-y-5 hidden md:block'>
                            <p>Cool. Crisp. Classic.</p>
                            <p className='subtitle'>
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className='view-cocktails'>
                            <p className='subtitle'>
                                Every cocktail on our menu is a blend of premium ingredients, creative flair,
                                and timeless recipies - designed to delight your senses.
                            </p>
                            <a href='#cocktails'>View Cocktails</a>
                        </div>
                    </div>
                </section>

            </section>

            <div className='video absolute inset-0 '>
                <video
                    ref={videoRef}
                    src='/videos/output.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
        </>
    )
}

export default Hero
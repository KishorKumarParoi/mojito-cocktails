import React from 'react'
import { openingHours, socials } from '../constants'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

const Contact = () => {

    useGSAP(() => {
        const titleSplit = SplitText.create('#contact h2', { type: 'words' })
        const timeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: 'power1.inOut',
        })

        timeLine
            .from(titleSplit.words, {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02
            })
            .from('#contact h3, #contact p', {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,
            })
            .to('#f-right-leaf', {
                y: '-50', duration: 1, ease: 'power1.inOut',
            })
            .to('#f-left-leaf', {
                y: '50', duration: 1, ease: 'power1.inOut',
            }, '<+0.2')
    }, [])

    return (
        <footer id='contact'>
            <img src='/images/footer-right-leaf.png' alt='leaf-right' id='f-right-leaf' />
            <img src='/images/footer-left-leaf.png' alt='leaf-left' id='f-left-leaf' />

            <div className='content'>
                <h2>Where to find us</h2>
                <div>
                    <h3>Visit our Bar</h3>
                    <p>645/1, Ramchandrapur, Golden Tower, Rajshahi</p>
                </div>

                <div>
                    <h3>Contact Us</h3>
                    <p>(+880)1724-714-156</p>
                    <p>kishor@ruet.cse@gmail.com</p>
                </div>

                <div>
                    <h3>Open Every Day</h3>
                    {
                        openingHours.map((time) => (
                            <p key={TimeRanges.day}>
                                {time.day} : {time.hours}
                            </p>
                        ))
                    }
                </div>

                <div>
                    <h3>Socials</h3>
                    <div className='flex-center gap-5'>
                        {
                            socials.map((social) => (
                                <a key={social.name}
                                    href={social.url}
                                    target='__blank'
                                    rel='noopener noreferrer'
                                    aria-label={social.name}
                                >
                                    <img src={social.icon} />
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Contact
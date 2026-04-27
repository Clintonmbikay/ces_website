import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const fadeInUp = (options: ScrollAnimationOptions = {}) => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 85%',
      end: options.end || 'bottom 20%',
      toggleActions: options.once ? 'play none none none' : (options.toggleActions || 'play reverse play reverse'),
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onLeaveBack: options.once ? undefined : () => {
        gsap.to(element, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          ease: 'power2.in',
        });
      },
    });

    triggersRef.current.push(trigger);
  };

  const fadeIn = (options: ScrollAnimationOptions = {}) => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 85%',
      toggleActions: options.once ? 'play none none none' : (options.toggleActions || 'play reverse play reverse'),
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onLeaveBack: options.once ? undefined : () => {
        gsap.to(element, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        });
      },
    });

    triggersRef.current.push(trigger);
  };

  const staggerChildren = (childSelector: string, options: ScrollAnimationOptions & { stagger?: number } = {}) => {
    const element = ref.current;
    if (!element) return;

    const children = element.querySelectorAll(childSelector);
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 80%',
      toggleActions: options.once ? 'play none none none' : (options.toggleActions || 'play reverse play reverse'),
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: options.stagger || 0.1,
          ease: 'power2.out',
        });
      },
      onLeaveBack: options.once ? undefined : () => {
        gsap.to(children, {
          opacity: 0,
          y: 30,
          duration: 0.4,
          stagger: options.stagger || 0.1,
          ease: 'power2.in',
        });
      },
    });

    triggersRef.current.push(trigger);
  };

  const scaleIn = (options: ScrollAnimationOptions = {}) => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, scale: 0.9 });

    const trigger = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 85%',
      toggleActions: options.once ? 'play none none none' : (options.toggleActions || 'play reverse play reverse'),
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      },
      onLeaveBack: options.once ? undefined : () => {
        gsap.to(element, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: 'power2.in',
        });
      },
    });

    triggersRef.current.push(trigger);
  };

  const slideInLeft = (options: ScrollAnimationOptions = {}) => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, x: -60 });

    const trigger = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 85%',
      toggleActions: options.once ? 'play none none none' : (options.toggleActions || 'play reverse play reverse'),
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onLeaveBack: options.once ? undefined : () => {
        gsap.to(element, {
          opacity: 0,
          x: -60,
          duration: 0.5,
          ease: 'power2.in',
        });
      },
    });

    triggersRef.current.push(trigger);
  };

  const slideInRight = (options: ScrollAnimationOptions = {}) => {
    const element = ref.current;
    if (!element) return;

    gsap.set(element, { opacity: 0, x: 60 });

    const trigger = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || 'top 85%',
      toggleActions: options.once ? 'play none none none' : (options.toggleActions || 'play reverse play reverse'),
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onLeaveBack: options.once ? undefined : () => {
        gsap.to(element, {
          opacity: 0,
          x: 60,
          duration: 0.5,
          ease: 'power2.in',
        });
      },
    });

    triggersRef.current.push(trigger);
  };

  const heroLoad = (options: { delay?: number; duration?: number; y?: number; reverse?: boolean } = {}) => {
    const element = ref.current;
    if (!element) return;

    const yOffset = options.y ?? 30;
    const duration = options.duration ?? 1;

    gsap.set(element, { opacity: 0, y: yOffset });

    const tl = gsap.timeline({
      scrollTrigger: options.reverse ? {
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: false,
        toggleActions: 'play reverse play reverse',
        onLeave: () => {
          gsap.to(element, {
            opacity: 0,
            y: -yOffset,
            duration: duration * 0.6,
            ease: 'power2.in',
          });
        },
        onEnterBack: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: duration * 0.8,
            ease: 'power2.out',
          });
        },
      } : undefined,
    });

    tl.to(element, {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: options.delay ?? 0,
      ease: 'power3.out',
    });
  };

  const staggerHeroChildren = (childSelector: string, options: { stagger?: number; delay?: number; duration?: number; y?: number; reverse?: boolean } = {}) => {
    const element = ref.current;
    if (!element) return;

    const children = element.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const yOffset = options.y ?? 40;
    const duration = options.duration ?? 0.8;
    const stagger = options.stagger ?? 0.15;

    gsap.set(children, { opacity: 0, y: yOffset });

    const tl = gsap.timeline({
      scrollTrigger: options.reverse ? {
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: false,
        toggleActions: 'play reverse play reverse',
        onLeave: () => {
          gsap.to(children, {
            opacity: 0,
            y: -yOffset * 0.5,
            duration: duration * 0.5,
            stagger: stagger * 0.5,
            ease: 'power2.in',
          });
        },
        onEnterBack: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: duration * 0.8,
            stagger: stagger,
            ease: 'power2.out',
          });
        },
      } : undefined,
    });

    tl.to(children, {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: options.delay ?? 0.2,
      stagger: stagger,
      ease: 'power3.out',
    });
  };

  return {
    ref,
    fadeInUp,
    fadeIn,
    staggerChildren,
    scaleIn,
    slideInLeft,
    slideInRight,
    heroLoad,
    staggerHeroChildren,
  };
}

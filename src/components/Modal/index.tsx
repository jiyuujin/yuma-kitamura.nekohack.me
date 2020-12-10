import React, { FC, useCallback, useEffect, useRef } from 'react'
import * as SC from './index.module.scss'

type ModalProps = {
    children: React.ReactChild
    onClose: any
}

const Modal: FC<ModalProps> = ({ children, onClose }: ModalProps) => {
    const ref = useRef(null)

    const escapeListener = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }, [])

    const clickListener = useCallback(
        (e: MouseEvent) => {
            if (!(ref.current! as any).contains(e.target)) {
                onClose?.()
            }
        },
        [ref.current]
    )

    useEffect(() => {
        document.addEventListener('click', clickListener)
        document.addEventListener('keyup', escapeListener)
        return () => {
            document.removeEventListener('click', clickListener)
            document.removeEventListener('keyup', escapeListener)
        }
    }, [])

    return (
        <div className={SC.modalMask}>
            <div ref={ref} className={SC.modalContainer}>
                {children}
            </div>
        </div>
    )
}

export default Modal

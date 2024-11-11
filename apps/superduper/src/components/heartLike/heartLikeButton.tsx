import { AnimatePresence, motion } from "framer-motion";
import "./LikeButton.css";

type LikeButtonProps = {
    isLiked: boolean;
    handleLike?: () => void;
};

export const LikeButton = ({ isLiked, handleLike }: LikeButtonProps) => {
    return (
        <div className={`like-btn-container ${isLiked ? "liked" : ""}`}>
            <AnimatePresence>
                <motion.button
                    whileTap="tap"
                    onClick={handleLike && handleLike}
                    type="button"
                    className="like-btn"
                >
                    {isLiked && (
                        <svg
                            className="svg-icon-answer-like-circle"
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="inherit"

                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.circle
                                key="answer-like-circle"
                                initial={{
                                    scale: 0,
                                    opacity: 1,
                                }}
                                animate={{
                                    scale: isLiked ? [0, 2] : 0,
                                    opacity: isLiked ? [1, 0] : 0,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                }}
                                opacity="1"
                                cx="13"
                                cy="13"
                                r="13"
                                fill="inherit"
                            />
                        </svg>
                    )}
                    <motion.svg
                        width="15"
                        height="15"
                        viewBox="0 0 26 26"
                        fill="inherit"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                            }}
                            animate={{
                                scale: isLiked ? [1, 0, 1] : 1,
                                opacity: isLiked ? 1 : 1,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            d="M6.42789 8.40196C7.25325 7.59676 8.34749 7.10721 9.51164 7.02233C10.6758 6.93745 11.8325 7.26289 12.7714 7.93946C13.7605 7.22193 14.9917 6.89657 16.2169 7.02889C17.4421 7.16122 18.5704 7.7414 19.3746 8.65261C20.1788 9.56381 20.5991 10.7384 20.551 11.9397C20.5028 13.1411 19.9897 14.28 19.115 15.1272L13.3234 20.7757C13.2511 20.8468 13.1651 20.9032 13.0704 20.9417C12.9757 20.9802 12.874 21 12.7714 21C12.6688 21 12.5672 20.9802 12.4725 20.9417C12.3777 20.9032 12.2917 20.8468 12.2195 20.7757L6.42789 15.1272C5.97494 14.6857 5.61562 14.1615 5.37047 13.5845C5.12531 13.0075 4.99913 12.3891 4.99913 11.7646C4.99913 11.14 5.12531 10.5216 5.37047 9.94461C5.61562 9.36764 5.97494 8.84344 6.42789 8.40196Z"
                            fill="inherit"
                        />
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                                x: 6,
                                y: 0,
                            }}
                            animate={{
                                scale: [1, 3],
                                x: isLiked ? [6, -6] : 6,
                                y: 0,
                                opacity: isLiked ? [0, 1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            d="M3 13.5C3 13.7761 2.77614 14 2.5 14C2.22386 14 2 13.7761 2 13.5C2 13.2239 2.22386 13 2.5 13C2.77614 13 3 13.2239 3 13.5Z"
                            fill="inherit"
                        />
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                                x: 0,
                                y: -6,
                            }}
                            animate={{
                                scale: [1, 3],
                                y: isLiked ? [-6, 6] : -6,
                                x: 0,
                                opacity: isLiked ? [0, 1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            d="M13 23.5C13 23.7761 12.7761 24 12.5 24C12.2239 24 12 23.7761 12 23.5C12 23.2239 12.2239 23 12.5 23C12.7761 23 13 23.2239 13 23.5Z"
                            fill="inherit"
                        />
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                                x: 0,
                                y: 6,
                            }}
                            animate={{
                                scale: [1, 3],
                                y: isLiked ? [6, -6] : 6,
                                x: 0,
                                opacity: isLiked ? [0, 1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            d="M13 4.5C13 4.77614 12.7761 5 12.5 5C12.2239 5 12 4.77614 12 4.5C12 4.22386 12.2239 4 12.5 4C12.7761 4 13 4.22386 13 4.5Z"
                            fill="inherit"
                        />
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                                y: 0,
                                x: -6,
                            }}
                            animate={{
                                scale: [1, 3],
                                x: isLiked ? [-6, 5] : 5,
                                y: 0,
                                opacity: isLiked ? [0, 1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            d="M25 13.5C25 13.7761 24.7761 14 24.5 14C24.2239 14 24 13.7761 24 13.5C24 13.2239 24.2239 13 24.5 13C24.7761 13 25 13.2239 25 13.5Z"
                            fill="inherit"
                        />
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                                y: 0,
                                x: 0,
                            }}
                            animate={{
                                scale: [1, 3],
                                x: isLiked ? [0, 3] : 0,
                                y: isLiked ? [0, -5] : 0,
                                opacity: isLiked ? [0, 1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                            }}
                            d="M22 7.5C22 7.77614 21.7761 8 21.5 8C21.2239 8 21 7.77614 21 7.5C21 7.22386 21.2239 7 21.5 7C21.7761 7 22 7.22386 22 7.5Z"
                            fill="inherit"
                        />
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                                y: 0,
                                x: 0,
                            }}
                            animate={{
                                scale: [1, 3],
                                x: isLiked ? [0, -3] : 0,
                                y: isLiked ? [0, -5] : 0,
                                opacity: isLiked ? [0, 1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                            }}
                            d="M6 6.5C6 6.77614 5.77614 7 5.5 7C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6C5.77614 6 6 6.22386 6 6.5Z"
                            fill="inherit"
                        />
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                                y: 0,
                                x: 0,
                            }}
                            animate={{
                                scale: [1, 3],
                                x: isLiked ? [0, -3] : 0,
                                y: isLiked ? [0, 5] : 0,
                                opacity: isLiked ? [0, 1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                            }}
                            d="M7 20.5C7 20.7761 6.77614 21 6.5 21C6.22386 21 6 20.7761 6 20.5C6 20.2239 6.22386 20 6.5 20C6.77614 20 7 20.2239 7 20.5Z"
                            fill="inherit"
                        />
                        <motion.path
                            initial={{
                                scale: 0,
                                opacity: 0,
                                y: 0,
                                x: 0,
                            }}
                            animate={{
                                scale: [1, 3],
                                x: isLiked ? [0, 3] : 0,
                                y: isLiked ? [0, 5] : 0,
                                opacity: isLiked ? [0, 1, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                            }}
                            d="M21 20.5C21 20.7761 20.7761 21 20.5 21C20.2239 21 20 20.7761 20 20.5C20 20.2239 20.2239 20 20.5 20C20.7761 20 21 20.2239 21 20.5Z"
                            fill="inherit"
                        />
                    </motion.svg>
                </motion.button>
            </AnimatePresence>
        </div>
    );
};

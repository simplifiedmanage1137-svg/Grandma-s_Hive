import React, { useState } from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: 'Wing', desc: 'Eco-friendly drone Delivery Solutions', type: 'Marketing Website' },
  { name: 'Fantom', desc: 'Rollerskating and Music', type: 'Marketing Website & Ecommerce' },
  { name: 'Swisher', desc: 'Pre-rolled Blunt Experience', type: 'Marketing Website' }
];

const ClientsSection = () => {
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="clients" className="clients-section">

            {/* 🔥 CUSTOM CURSOR */}
            {hoveredIndex !== null && (
                <motion.div
                    className="custom-cursor"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        left: cursor.x,
                        top: cursor.y,
                    }}
                >
                    →
                </motion.div>
            )}

            <div className="container">
                <div className="row g-4">
                    {clients.map((client, index) => (
                        <motion.div
                            key={client.name}
                            className="col-md-6 col-lg-4"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onMouseMove={(e) => 
                                setCursor({ x: e.clientX, y: e.clientY })
                            }
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div 
                                className={`client-card ${hoveredIndex === index ? 'hovered' : ''}`}
                            >
                                <a
                                    href={`/work/${client.name.toLowerCase()}`}
                                    className="client-link"
                                >
                                    <div className="client-name">{client.name}</div>
                                    <div className="client-desc">{client.desc}</div>
                                    <div className="client-type">{client.type}</div>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .clients-section {
                    padding: 100px 0;
                    position: relative;
                    background-color: #fafaf9;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                }

                .client-card {
                    padding: 60px 30px;
                    text-align: left;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                    cursor: none;
                    background-color: transparent;
                    border: 1px solid #e5e5e5;
                }

                /* 🔥 BLACK BACKGROUND ON HOVER */
                .client-card.hovered {
                    background-color: #000000 !important;
                    border-color: #000000 !important;
                }

                .client-card.hovered .client-name,
                .client-card.hovered .client-desc,
                .client-card.hovered .client-type {
                    color: #ffffff !important;
                }

                .client-link {
                    text-decoration: none;
                    display: block;
                }

                .client-name {
                    font-family: "Lay Grotesk - Trial Black", "Archivo", sans-serif;
                    font-size: 48px;
                    font-weight: 700;
                    color: #0e0c0c;
                    margin-bottom: 20px;
                    transition: color 0.3s ease;
                }

                .client-desc {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 18px;
                    color: #666;
                    margin-bottom: 10px;
                    transition: color 0.3s ease;
                }

                .client-type {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    color: #999;
                    transition: color 0.3s ease;
                }

                /* 🔥 CUSTOM CURSOR */
                .custom-cursor {
                    position: fixed;
                    width: 70px;
                    height: 70px;
                    background: #4c3cff;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    font-weight: bold;
                    pointer-events: none;
                    transform: translate(-50%, -50%);
                    z-index: 9999;
                    border-radius: 0;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }

                /* Hide default cursor on hover */
                .client-card:hover {
                    cursor: none;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .client-name {
                        font-size: 32px;
                    }
                    
                    .client-desc {
                        font-size: 16px;
                    }
                    
                    .client-card {
                        padding: 40px 20px;
                    }
                    
                    .custom-cursor {
                        display: none;
                    }
                    
                    .client-card:hover {
                        cursor: pointer;
                    }
                }
            `}</style>
        </section>
    );
};

export default ClientsSection;
import React from 'react';
import { useSelector } from 'react-redux';

export function HomePage() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <main className="main-content">
            {loggedInUser && (
                <section className="user-welcome flex flex-column align-center">
                    <h2>Welcome back, {loggedInUser.fullname}! your balance: {loggedInUser.score} </h2>
                </section>
            )}
            <section className="welcome-section flex flex-column align-center">
                <h2>Welcome to Our Toy Wonderland!</h2>
                <p>Discover a world of imagination and fun. Our toy store offers a wide range of toys for kids of all ages. From classic toys to the latest gadgets, we have something to spark joy in every child.</p>
            </section>
            <section className="featured-toys flex flex-column align-center">
                <h2>Featured Toys</h2>
                <div className="toy-gallery">
                    <div className="toy-item"><img src="/home-page-toys/buzz 300x300.webp" /></div>
                    <div className="toy-item"><img src="/home-page-toys/jessie 300x300.jpg" /></div>
                    <div className="toy-item"><img src="/home-page-toys/wody-300x300.jpg" /></div>
                </div>
            </section>
            <section className="new-arrivals flex flex-column align-center">
                <h2>New Arrivals</h2>
                <p>Check out our latest collection of toys and games. Be the first to get your hands on the newest and coolest toys in town!</p>
            </section>
            <section className="special-offers flex flex-column align-center">
                <h2>Special Offers</h2>
                <p>Don't miss our exclusive deals and discounts! Great toys don't have to come with a big price tag. Explore our special offers now.</p>
            </section>
        </main>
    );
}

import React from 'react'

export function HiddenMickeys() {
  return (
    <>
      <header>
        <h2>View All Hidden Mickeys</h2>
      </header>
      <article className="hmDropdown">
        <div class="dropdown">
          <span>Park Name</span>
          <div class="dropdown-content">
            <p>Magic Kingdom</p>
            <p>Epcot</p>
            <p>Hollywood Studios</p>
            <p>Animal Kingdom</p>
          </div>
        </div>
        <div class="dropdown">
          <span>Area of the Park</span>
          <div class="dropdown-content">
            <p>Main Street USA</p>
            <p>Fantasyland</p>
            <p>Tomorrowland</p>
            <p>Adventureland</p>
            <p>Frontierland</p>
            <p>Liberty Square</p>
          </div>
        </div>
      </article>
      <section>
        <h4>Location: Curtain Call Collectibles</h4>
        <p>
          Clue: Adjacent to the Town Square Theater; the shop features a
          collection of Disney-themed goods and hats. Find a sewing machine
          stand located at the front of the store with a Mary Poppins dress on
          display.
        </p>
        <h4>Location: Emporium</h4>
        <p>
          Clue: In the back portion of the store that connects with a wide
          street, locate a wall mural featuring a turn-of-the century display of
          what life was like over a hundred years ago.
        </p>
        <h4>Location: Main Street Confectionary</h4>
        <p>
          Clue: For those that have a sweet tooth, this is the place for you.
          Gear up for a Hidden Mickey in the window.
        </p>
        <h4>Location: Plaza Restaurant</h4>
        <p>
          Clue: Inside, there is a Hidden Mickey located in one of the pictures
          on the far right wall of the restaurant.
        </p>
        <h4>Location: Railroad Station</h4>
        <p>
          Clue: The train station above the Park’s entry area has a Hidden
          Mickey situated along the top portion of the train station itself.
        </p>
      </section>
    </>
  )
}

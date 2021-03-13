using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HiddenMickey.Models;

namespace HiddenMickey.Controllers
{
    // All of these routes will be at the base URL:     /api/AreaOfTheParks
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case AreaOfTheParksController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class AreaOfTheParksController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public AreaOfTheParksController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/AreaOfTheParks
        //
        // Returns a list of all your AreaOfTheParks
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AreaOfThePark>>> GetAreaOfTheParks()
        {
            // Uses the database context in `_context` to request all of the AreaOfTheParks, sort
            // them by row id and return them as a JSON array.
            return await _context.AreaOfTheParks.Include(area => area.HiddenMickeys).OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/AreaOfTheParks/5
        //
        // Fetches and returns a specific areaOfThePark by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<AreaOfThePark>> GetAreaOfThePark(int id)
        {
            // Find the areaOfThePark in the database using `FindAsync` to look it up by id
            var areaOfThePark = await _context.AreaOfTheParks.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (areaOfThePark == null)
            {
                // Return a `404` response to the client indicating we could not find a areaOfThePark with this id
                return NotFound();
            }

            //  Return the areaOfThePark as a JSON object.
            return areaOfThePark;
        }

        // PUT: api/AreaOfTheParks/5
        //
        // Update an individual areaOfThePark with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a AreaOfThePark
        // variable named areaOfThePark. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our AreaOfThePark POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAreaOfThePark(int id, AreaOfThePark areaOfThePark)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != areaOfThePark.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in areaOfThePark to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from areaOfThePark
            _context.Entry(areaOfThePark).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!AreaOfTheParkExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(areaOfThePark);
        }

        // POST: api/AreaOfTheParks
        //
        // Creates a new areaOfThePark in the database.
        //
        // The `body` of the request is parsed and then made available to us as a AreaOfThePark
        // variable named areaOfThePark. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our AreaOfThePark POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<AreaOfThePark>> PostAreaOfThePark(AreaOfThePark areaOfThePark)
        {
            // Indicate to the database context we want to add this new record
            _context.AreaOfTheParks.Add(areaOfThePark);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetAreaOfThePark", new { id = areaOfThePark.Id }, areaOfThePark);
        }

        // DELETE: api/AreaOfTheParks/5
        //
        // Deletes an individual areaOfThePark with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAreaOfThePark(int id)
        {
            // Find this areaOfThePark by looking for the specific id
            var areaOfThePark = await _context.AreaOfTheParks.FindAsync(id);
            if (areaOfThePark == null)
            {
                // There wasn't a areaOfThePark with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.AreaOfTheParks.Remove(areaOfThePark);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(areaOfThePark);
        }

        // Private helper method that looks up an existing areaOfThePark by the supplied id
        private bool AreaOfTheParkExists(int id)
        {
            return _context.AreaOfTheParks.Any(areaOfThePark => areaOfThePark.Id == id);
        }
    }
}

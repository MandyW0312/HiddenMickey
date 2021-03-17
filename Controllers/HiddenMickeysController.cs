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
    // All of these routes will be at the base URL:     /api/HiddenMickeys
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case HiddenMickeysController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class HiddenMickeysController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public HiddenMickeysController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/HiddenMickeys
        //
        // Returns a list of all your HiddenMickeys
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HiddenMickey.Models.HiddenMickey>>> GetHiddenMickeys(int areaId)
        {
            // Uses the database context in `_context` to request all of the HiddenMickeys, sort
            // them by row id and return them as a JSON array.
                return await _context.HiddenMickeys.Where(mickey => mickey.AreaOfTheParkId == areaId).OrderBy(row => row.Id).ToListAsync();
            
        }

        [HttpGet("Parks/{parkId}")]
        public async Task<ActionResult<IEnumerable<HiddenMickey.Models.HiddenMickey>>> GetHiddenMickeysInSpecificPark(int parkId)
        {
            // Uses the database context in `_context` to request all of the HiddenMickeys, sort
            // them by row id and return them as a JSON array.
            var park = await _context.Parks.
                                        Include(park => park.AreaOfTheParks).
                                        ThenInclude(areaOfThePark => areaOfThePark.HiddenMickeys).
                                        Where(park => park.Id == parkId).
                                        FirstOrDefaultAsync();

            IEnumerable<HiddenMickey.Models.HiddenMickey> allMickeys = new List<HiddenMickey.Models.HiddenMickey>();    
            foreach (var areaOfThePark in park.AreaOfTheParks) {
                allMickeys = allMickeys.Concat(areaOfThePark.HiddenMickeys);
            }                   
            //Shuffle Mickeys
            var someMickeys = allMickeys.Take(2);

                return Ok(someMickeys);
            
        }
        // GET: api/HiddenMickeys/5
        //
        // Fetches and returns a specific hiddenMickey by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<HiddenMickey.Models.HiddenMickey>> GetHiddenMickey(int id)
        {
            // Find the hiddenMickey in the database using `FindAsync` to look it up by id
            var hiddenMickey = await _context.HiddenMickeys.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (hiddenMickey == null)
            {
                // Return a `404` response to the client indicating we could not find a hiddenMickey with this id
                return NotFound();
            }

            //  Return the hiddenMickey as a JSON object.
            return hiddenMickey;
        }

        // PUT: api/HiddenMickeys/5
        //
        // Update an individual hiddenMickey with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a HiddenMickey
        // variable named hiddenMickey. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our HiddenMickey POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHiddenMickey(int id, HiddenMickey.Models.HiddenMickey hiddenMickey)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != hiddenMickey.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in hiddenMickey to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from hiddenMickey
            _context.Entry(hiddenMickey).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!HiddenMickeyExists(id))
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
            return Ok(hiddenMickey);
        }

        // POST: api/HiddenMickeys
        //
        // Creates a new hiddenMickey in the database.
        //
        // The `body` of the request is parsed and then made available to us as a HiddenMickey
        // variable named hiddenMickey. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our HiddenMickey POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<HiddenMickey.Models.HiddenMickey>> PostHiddenMickey(HiddenMickey.Models.HiddenMickey hiddenMickey)
        {
            // Indicate to the database context we want to add this new record
            _context.HiddenMickeys.Add(hiddenMickey);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetHiddenMickey", new { id = hiddenMickey.Id }, hiddenMickey);
        }

        // DELETE: api/HiddenMickeys/5
        //
        // Deletes an individual hiddenMickey with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHiddenMickey(int id)
        {
            // Find this hiddenMickey by looking for the specific id
            var hiddenMickey = await _context.HiddenMickeys.FindAsync(id);
            if (hiddenMickey == null)
            {
                // There wasn't a hiddenMickey with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.HiddenMickeys.Remove(hiddenMickey);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(hiddenMickey);
        }

        // Private helper method that looks up an existing hiddenMickey by the supplied id
        private bool HiddenMickeyExists(int id)
        {
            return _context.HiddenMickeys.Any(hiddenMickey => hiddenMickey.Id == id);
        }
    }
}

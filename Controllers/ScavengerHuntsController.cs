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
    // All of these routes will be at the base URL:     /api/ScavengerHunts
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case ScavengerHuntsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class ScavengerHuntsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public ScavengerHuntsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/ScavengerHunts
        //
        // Returns a list of all your ScavengerHunts
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScavengerHunt>>> GetScavengerHunts()
        {
            // Uses the database context in `_context` to request all of the ScavengerHunts, sort
            // them by row id and return them as a JSON array.
            return await _context.ScavengerHunts.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/ScavengerHunts/5
        //
        // Fetches and returns a specific scavengerHunt by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<ScavengerHunt>> GetScavengerHunt(int id)
        {
            // Find the scavengerHunt in the database using `FindAsync` to look it up by id
            var scavengerHunt = await _context.ScavengerHunts.
                                            Include(scavengerHunt => scavengerHunt.ScavengerHuntMickeys).
                                            ThenInclude(scavengerHuntMickey => scavengerHuntMickey.HiddenMickey).
                                            Where(scavengerHunt => scavengerHunt.Id == id).
                                            FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (scavengerHunt == null)
            {
                // Return a `404` response to the client indicating we could not find a scavengerHunt with this id
                return NotFound();
            }

            //  Return the scavengerHunt as a JSON object.
            return scavengerHunt;
        }

        // PUT: api/ScavengerHunts/5
        //
        // Update an individual scavengerHunt with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a ScavengerHunt
        // variable named scavengerHunt. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our ScavengerHunt POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScavengerHunt(int id, ScavengerHunt scavengerHunt)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != scavengerHunt.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in scavengerHunt to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from scavengerHunt
            _context.Entry(scavengerHunt).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!ScavengerHuntExists(id))
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
            return Ok(scavengerHunt);
        }

        // POST: api/ScavengerHunts
        //
        // Creates a new scavengerHunt in the database.
        //
        // The `body` of the request is parsed and then made available to us as a ScavengerHunt
        // variable named scavengerHunt. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our ScavengerHunt POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<ScavengerHunt>> PostScavengerHunt(int parkId)
        {
            // Indicate to the database context we want to add this new record
            var newScavengerHunt = new ScavengerHunt();

            _context.ScavengerHunts.Add(newScavengerHunt);
            await _context.SaveChangesAsync();


            var park = await _context.Parks.
                                        Include(park => park.AreaOfTheParks).
                                        ThenInclude(areaOfThePark => areaOfThePark.HiddenMickeys).
                                        Where(park => park.Id == parkId).
                                        FirstOrDefaultAsync();

            var allMickeys = new List<HiddenMickey.Models.HiddenMickey>();    
            foreach (var areaOfThePark in park.AreaOfTheParks) {
                foreach(var mickey in areaOfThePark.HiddenMickeys) {
                    allMickeys.Add(mickey);
                }
            }                   
            //Shuffle Mickeys
            
            for (var rightIndex = allMickeys.Count() - 1; rightIndex >= 1; rightIndex--)
            {
                var randomNumberGenerator = new Random();
                var leftIndex = randomNumberGenerator.Next(rightIndex);
                var leftMickey = allMickeys[rightIndex];
                var rightMickey = allMickeys[leftIndex];
                allMickeys[rightIndex] = rightMickey;
                allMickeys[leftIndex] = leftMickey;
            }

            var someMickeys = allMickeys.Take(10);

            foreach(var mickey in someMickeys) {
                var scavengerHuntMickey = new ScavengerHuntMickey{
                    HiddenMickeyId = mickey.Id,
                    ScavengerHuntId = newScavengerHunt.Id,
                };
                _context.ScavengerHuntMickeys.Add(scavengerHuntMickey);
            }

            await _context.SaveChangesAsync();

            var scavengerHuntWithMickeys = await _context.ScavengerHunts.
                                            Where(scavengerHunt => scavengerHunt.Id == newScavengerHunt.Id).
                                            Include(scavengerHunt => scavengerHunt.ScavengerHuntMickeys).
                                            ThenInclude(scavengerHuntMickey => scavengerHuntMickey.HiddenMickey).
                                            FirstOrDefaultAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetScavengerHunt", new { id = scavengerHuntWithMickeys.Id }, scavengerHuntWithMickeys);
                
        }

        // DELETE: api/ScavengerHunts/5
        //
        // Deletes an individual scavengerHunt with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScavengerHunt(int id)
        {
            // Find this scavengerHunt by looking for the specific id
            var scavengerHunt = await _context.ScavengerHunts.FindAsync(id);
            if (scavengerHunt == null)
            {
                // There wasn't a scavengerHunt with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.ScavengerHunts.Remove(scavengerHunt);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(scavengerHunt);
        }

        // Private helper method that looks up an existing scavengerHunt by the supplied id
        private bool ScavengerHuntExists(int id)
        {
            return _context.ScavengerHunts.Any(scavengerHunt => scavengerHunt.Id == id);
        }
    }
}

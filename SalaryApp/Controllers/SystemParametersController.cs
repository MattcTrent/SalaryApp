using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Entities.Data;
using Entities.Models;

namespace SalaryApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemParametersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SystemParametersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SystemParameters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SystemParameter>>> GetSystemParameters()
        {
            return await _context.SystemParameters.ToListAsync();
        }

        // GET: api/SystemParameters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SystemParameter>> GetSystemParameter(int id)
        {
            var systemParameter = await _context.SystemParameters.FindAsync(id);

            if (systemParameter == null)
            {
                return NotFound();
            }

            return systemParameter;
        }

        // PUT: api/SystemParameters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSystemParameter(int id, SystemParameter systemParameter)
        {
            if (id != systemParameter.Id)
            {
                return BadRequest();
            }

            _context.Entry(systemParameter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemParameterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SystemParameters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SystemParameter>> PostSystemParameter(SystemParameter systemParameter)
        {
            _context.SystemParameters.Add(systemParameter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSystemParameter", new { id = systemParameter.Id }, systemParameter);
        }

        // DELETE: api/SystemParameters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSystemParameter(int id)
        {
            var systemParameter = await _context.SystemParameters.FindAsync(id);
            if (systemParameter == null)
            {
                return NotFound();
            }

            _context.SystemParameters.Remove(systemParameter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SystemParameterExists(int id)
        {
            return _context.SystemParameters.Any(e => e.Id == id);
        }
    }
}

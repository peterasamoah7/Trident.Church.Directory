using Application.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ParishController : ControllerBase
    {
        private readonly IParishService _parishService;

        public ParishController(IParishService parishService)
        {
            _parishService = parishService;
        }

        /// <summary>
        /// Get all parishes
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]PageQuery query)
        {
            var parishes = await _parishService.GetAllParishs(query.Query, query.PageNumber, query.PageSize);

            return Ok(parishes);
        }

        /// <summary>
        /// Get a parish
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var parish = await _parishService.GetParish(id);

            return Ok(parish);
        }

        /// <summary>
        /// Get all church parishioners
        /// </summary>
        /// <param name="id"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpGet("{id}/parishioners")]
        public async Task<IActionResult> GetParishioners(Guid id, [FromQuery]PageQuery query)
        {
            var parishioners = await _parishService.GetParishioners(id, query.PageNumber, query.PageSize);

            return Ok(parishioners);
        }

        /// <summary>
        /// Get all church groups
        /// </summary>
        /// <param name="id"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpGet("{id}/parishgroups")]
        public async Task<IActionResult> GetParishGroups(Guid id, [FromQuery] PageQuery query)
        {
            var parishioners = await _parishService.GetParishGroups(id, query.PageNumber, query.PageSize);

            return Ok(parishioners);
        }
    }
}

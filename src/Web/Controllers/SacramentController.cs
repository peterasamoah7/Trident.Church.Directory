using Application.Interfaces;
using Core.Models;
using Core.Pagination;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Extensions;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class SacramentController : ControllerBase
    {
        private readonly ISacramentService _sacramentService;

        public SacramentController(ISacramentService sacramentService)
        {
            _sacramentService = sacramentService;
        }

        /// <summary>
        /// Create a sacrament
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPost("{id}")]
        public async Task<ActionResult> Create(Guid id, [FromBody] CreateSacramentModel sacrament)
        {
            await _sacramentService.CreateSacrament(id, User.Parish(), sacrament);
            return Ok();
        }

        /// <summary>
        /// Update a sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(Guid id, [FromBody] UpdateSacramentModel viewModel)
        {
            await _sacramentService.UpdateSacrament(id, viewModel);
            return Ok();
        }

        /// <summary>
        /// Delete a sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _sacramentService.DeleteSacrament(id);
            return Ok();
        }

        /// <summary>
        /// Get a sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<SacramentViewModel>> Get(Guid id)
        {
            return await _sacramentService.GetSacrament(id);
        }

        /// <summary>
        /// Get default sacraments
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetDefault() =>
                Ok(await _sacramentService.GetDefaultSacraments());

        /// <summary>
        /// Get all sacraments
        /// </summary>
        /// <param name="pageQuery"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SacramentMetric>>> GetMetrics([FromQuery] PageQuery pageQuery)
        {
            var response =  await _sacramentService.GetAllSacraments(
                User.Parish(), pageQuery.PageNumber, pageQuery.PageSize);
            return Ok(response);
        }

        /// <summary>
        /// Get all parishioners by sacrament type
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageQuery"></param>
        /// <returns></returns>
        [HttpGet("{type}")]
        public async Task<ActionResult<PageResult<IEnumerable<ParishionerViewModel>>>> GetParishioners(
            string type, [FromQuery] PageQuery pageQuery)
        {
            var response = await _sacramentService.GetAllParishioners(
                Enum.Parse<SacramentType>(type, true), User.Parish(), pageQuery.PageNumber, pageQuery.PageSize);
            return Ok(response);
        }
    }
}

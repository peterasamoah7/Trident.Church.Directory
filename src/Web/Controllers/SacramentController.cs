using Application.Interfaces;
using Core.Models;
using Core.Pagination;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        [HttpPost]
        public async Task<ActionResult<SacramentViewModel>> Create(SacramentViewModel viewModel)
        {
            return await _sacramentService.CreateSacrament(viewModel);
        }

        /// <summary>
        /// Update a sacrament
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<SacramentViewModel>> Update(Guid id, SacramentViewModel viewModel)
        {
            return await _sacramentService.UpdateSacrament(id, viewModel);
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
        /// Get all sacraments
        /// </summary>
        /// <param name="pageQuery"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<PageResult<IEnumerable<SacramentViewModel>>>> GetAll(PageQuery pageQuery)
        {
            return await _sacramentService.GetAllSacraments(pageQuery.PageNumber, pageQuery.PageSize);
        }

        /// <summary>
        /// Get all sacraments by type
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageQuery"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<PageResult<IEnumerable<SacramentViewModel>>>> GetAllByType(
            [FromQuery] string type, PageQuery pageQuery)
        {
            return await _sacramentService.GetAllSacramentsBySacramentType(
                Enum.Parse<SacramentType>(type), pageQuery.PageNumber, pageQuery.PageSize);
        }

        /// <summary>
        /// Get all parishioners by sacrament type
        /// </summary>
        /// <param name="type"></param>
        /// <param name="pageQuery"></param>
        /// <returns></returns>
        [HttpGet("parishioners")]
        public async Task<ActionResult<PageResult<IEnumerable<ParishionerViewModel>>>> GetAllParishionersByType(
            [FromQuery] string type, PageQuery pageQuery)
        {
            return await _sacramentService.GetAllParishionersBySacramentType(
                Enum.Parse<SacramentType>(type), pageQuery.PageNumber, pageQuery.PageSize);
        }
    }
}

using Application.Interfaces;
using Core.Models;
using Core.Pagination;
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
    public class ParishGroupController : ControllerBase
    {
        private readonly IParishGroupService _parishGroupService;

        public ParishGroupController(IParishGroupService parishGroupService)
        {
            _parishGroupService = parishGroupService;
        }

        /// <summary>
        /// Create a parish group
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPost("{id}")]
        public async Task<ActionResult<ParishGroupViewModel>> Create(Guid id, ParishGroupViewModel viewModel)
        {
            return await _parishGroupService.CreateParishGroup(id, viewModel);
        }

        /// <summary>
        /// Update a parish group
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ParishGroupViewModel>> Update(ParishGroupViewModel viewModel)
        {
            return await _parishGroupService.UpdateParishGroup(viewModel);
        }

        /// <summary>
        /// Delete a parish group
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _parishGroupService.DeleteParishGroup(id);
            return Ok();
        }
        
        /// <summary>
        /// Get a parish group
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ParishGroupViewModel>> Get(Guid id)
        {
            return await _parishGroupService.GetParishGroup(id);
        }

        /// <summary>
        /// Get all parish groups
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<PageResult<IEnumerable<ParishGroupViewModel>>>> GetAll([FromQuery]PageQuery query)
        {
            return await _parishGroupService.GetAllParishGroups(query.Query, query.PageNumber, query.PageSize);
        }

        /// <summary>
        /// Get all parishioners by church group
        /// </summary>
        /// <param name="id"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<PageResult<IEnumerable<ParishionerViewModel>>>> GetParishioners(
            Guid id, [FromQuery]int pageNumber, [FromQuery]int pageSize)
        {
            return await _parishGroupService.GetAllParishionersByChurchGroupId(id, pageNumber, pageSize);
        }

        /// <summary>
        /// Add parishioner to parish group
        /// </summary>
        /// <param name="parishId"></param>
        /// <param name="parishionerId"></param>
        /// <returns></returns>
        [HttpPost("{parishId}/parishioner/{parishionerId}")]
        public async Task<IActionResult> AddParishioner(Guid parishId, Guid parishionerId)
        {
            await _parishGroupService.AddParishionerToGroup(parishId, parishionerId);
            return Ok();
        }

        /// <summary>
        /// Delete parishioner to parish group
        /// </summary>
        /// <param name="parishId"></param>
        /// <param name="parishionerId"></param>
        /// <returns></returns>
        [HttpDelete("{parishId}/parishioner/{parishionerId}")]
        public async Task<IActionResult> DeleteParishioner(Guid parishId, Guid parishionerId)
        {
            await _parishGroupService.AddParishionerToGroup(parishId, parishionerId);
            return Ok();
        }
    }
}

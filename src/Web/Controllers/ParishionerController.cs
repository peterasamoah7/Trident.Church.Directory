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
    public class ParishionerController : ControllerBase
    {
        private readonly IParishionerService _parishionerService;

        public ParishionerController(IParishionerService parishionerService)
        {
            _parishionerService = parishionerService;
        }

        /// <summary>
        /// Create a parishioner
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<ParishionerViewModel>> Create(ParishionerViewModel viewModel)
        {
            return await _parishionerService.CreateParishioner(viewModel);
        }

        /// <summary>
        /// Update a parishioner
        /// </summary>
        /// <param name="id"></param>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ParishionerViewModel>> Update(Guid id, ParishionerViewModel viewModel)
        {
            return await _parishionerService.UpdateParishioner(id, viewModel);
        }

        /// <summary>
        /// Delete a parishioner
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _parishionerService.DeleteParishioner(id);
            return Ok();
        }

        /// <summary>
        /// Get a parishioner
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ParishionerViewModel>> Get(Guid id)
        {
            return await _parishionerService.GetParishioner(id);
        }

        /// <summary>
        /// Get all parishioners
        /// </summary>
        /// <param name="pageQuery"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<PageResult<IEnumerable<ParishionerViewModel>>>> GetAll(PageQuery pageQuery)
        {
            return await _parishionerService.GetAllParishioners(pageQuery.Query, pageQuery.PageNumber, pageQuery.PageSize);
        }
    }
}

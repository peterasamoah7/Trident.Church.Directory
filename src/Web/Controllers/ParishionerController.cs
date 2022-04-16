using Application.Interfaces;
using Core.Enums;
using Core.Models;
using Core.Pagination;
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
            return await _parishionerService.CreateParishioner(User.Parish(), viewModel);
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
            viewModel.Id = id;
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
        public async Task<ActionResult<PageResult<IEnumerable<ParishionerViewModel>>>> GetAll([FromQuery]PageQuery pageQuery)
        {
            return await _parishionerService.GetAllParishioners(
                User.Parish(), pageQuery.Query, pageQuery.PageNumber, pageQuery.PageSize);
        }


        /// <summary>
        /// Add a relative
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> AddRelative(Guid id, [FromBody]CreateRelativeModel model)
        {
            await _parishionerService.AddRelative(id, model);
            return Ok();
        }
    }
}

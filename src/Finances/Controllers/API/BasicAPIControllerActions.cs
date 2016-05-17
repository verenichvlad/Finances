using System;
using Finances.Models;
using Microsoft.AspNet.Mvc;

namespace Finances.Controllers.API
{
    public static class BasicApiControllerActions
    {
        public static JsonResult Create(IFinancesRepo _repo,
                                           Controller controller,
                                           Action<IFinancesRepo> createAction)
        {
            try
            {
                if (controller.ModelState.IsValid)
                {
                    createAction(_repo);

                    if (!_repo.SaveAll()) throw new Exception(Constants.ExceptionConstants.FailedToSave);
                }
            }
            catch
            {
                return controller.Json(false);
                //TODO Add logger to log ex
            }

            return controller.Json(true);
        }

        public static JsonResult Update(IFinancesRepo _repo,
                                           Controller controller,
                                           Action<IFinancesRepo> createAction)
        {
            try
            {
                if (controller.ModelState.IsValid)
                {
                    createAction(_repo);

                    if (!_repo.SaveAll()) throw new Exception(Constants.ExceptionConstants.FailedToSave);
                }
            }
            catch
            {
                return controller.Json(false);
                //TODO Add logger to log ex
            }

            return controller.Json(true);
        }

        public static JsonResult Delete(IFinancesRepo _repo,
                                   Controller controller,
                                   Action<IFinancesRepo> deleteAction)
        {
            try
            {
                deleteAction(_repo);
                if (!_repo.SaveAll()) throw new Exception(Constants.ExceptionConstants.FailedToSave);
            }
            catch
            {
                return controller.Json(false);
                //TODO Add logger to log ex
            }

            return controller.Json(true);
        }
    }
}

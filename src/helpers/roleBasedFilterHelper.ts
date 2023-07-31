import { ADMIN, USER, AGENT } from "../constants/userConstants"
import filterHelper from "./filterHelper";

class RoleBasedFilterHelper {

  public tickets(query, user, filter) {
    if (user.user_type === ADMIN) {
      if (user.user_type === "ADMIN" && filter.assign_to === "UNASSIGNED") {
        query.assigned_to = { $exists: false }
      }
      if (user.user_type === "ADMIN" && filter.assign_to === "ME") {
        query.assigned_to = user.email;
      }
      if (user.user_type === "ADMIN" && filter.assign_to === "OTHERS") {
        query.assigned_to = { $ne: user.email }
      }

      query = filterHelper.tickets(query, user);

    } else if (user.user_type === AGENT) {
      query.assigned_to = user.email;

    } else if (user.user_type === USER) {
      query.email = user.email;
    }
    return query;
  }

}

export default new RoleBasedFilterHelper()
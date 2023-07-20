import { ADMIN, USER, AGENT } from "../constants/userConstants"
import filterHelper from "./filterHelper";

class RoleBasedFilterHelper {

  public tickets(query, user) {

    if (user.user_type === ADMIN) {
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
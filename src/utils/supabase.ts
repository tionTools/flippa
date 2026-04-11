import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://taveuiuiugmlicispbmm.supabase.co";
const supabaseKey = "sb_publishable_cd6Wrn3EU2KEbRdbL6tu6w_d0yOgjrk";

export const supabase = createClient(supabaseUrl, supabaseKey);

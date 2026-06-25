import { jsonResponse } from "@/lib/response";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Thử truy vấn số lượng dòng trong bảng users để test kết nối
    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    if (error) {
      return jsonResponse(
        {
          status: "error",
          message: "Kết nối Supabase thất bại hoặc bảng 'users' chưa được tạo.",
          details: error.message,
          hint: "Hãy đảm bảo bạn đã tạo bảng 'users' trong Supabase SQL Editor theo hướng dẫn.",
          code: error.code,
        },
        { status: 500 }
      );
    }

    return jsonResponse({
      status: "success",
      message: "Kết nối CSDL Supabase hoạt động hoàn hảo!",
      databaseUrl: process.env.SUPABASE_URL,
      usersCount: count,
    });
  } catch (err: any) {
    return jsonResponse(
      {
        status: "error",
        message: "Không thể khởi tạo hoặc kết nối tới Supabase Client.",
        details: err.message || err,
      },
      { status: 500 }
    );
  }
}

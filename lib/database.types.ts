export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agent: {
        Row: {
          created_at: string | null
          id: string
          instructions: string[]
          name: string
          purpose: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          instructions?: string[]
          name: string
          purpose: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          instructions?: string[]
          name?: string
          purpose?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      agent_instance: {
        Row: {
          agent_id: string
          created_at: string | null
          id: string
          meta: Json[]
          user_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          id?: string
          meta?: Json[]
          user_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          id?: string
          meta?: Json[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_instance_agent_id_fkey"
            columns: ["agent_id"]
            referencedRelation: "agent"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_instance_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string | null
          id: string
          is_admin: boolean
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_admin?: boolean
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_admin?: boolean
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

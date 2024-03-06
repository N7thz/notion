"use client"

import React from "react"
import {
    useEditor, EditorContent, BubbleMenu, FloatingMenu
} from '@tiptap/react'
import StarterKit from "@tiptap/starter-kit"
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { inicialContent } from "./inicialContent"
import 'highlight.js/styles/tokyo-night-dark.css'
import { common, createLowlight } from 'lowlight'
import { BubbleButton } from "./bubble-button"
import Image from "next/image"
import {

    Bold,
    Code,
    Italic,
    Strikethrough,
    ChevronDown,
    MessageSquareText
} from "lucide-react"

const lowlight = createLowlight(common)

lowlight.highlight('js', '"use strict;"')

export const Editor = () => {

    const editor = useEditor({

        extensions: [

            StarterKit,
            CodeBlockLowlight.configure({

                lowlight
            })
        ],
        content: inicialContent,
        editorProps: {

            attributes: {

                class: 'outline-none'
            }
        }
    })

    const handleChangeForBold = () => {

        editor && editor.chain().focus().toggleBold().run()
    }

    const handleChangeForItalic = () => {

        editor && editor.chain().focus().toggleItalic().run()
    }

    const handleChangeForStrike = () => {

        editor && editor.chain().focus().toggleStrike().run()
    }

    const handleChangeForCode = () => {

        editor && editor.chain().focus().toggleCode().run()
    }

    const handleChangeForHeader = () => {

        editor && editor.chain().focus().toggleHeading({ level: 1 }).run()
    }

    return (

        <>
            <EditorContent
                className="max-w-[700px] mx-auto pt-16 prose prose-indigo"
                editor={editor}
            />
            {
                editor &&
                <FloatingMenu
                    editor={editor}
                    className="bg-zinc-50 flex flex-col ga-2 shadow-xl border-zinc-50
                    shadow-black/20 rounded-md overflow-hidden"
                    shouldShow={({ state }) => {

                        const { $from } = state.selection

                        const currentLineText = $from.nodeBefore?.textContent

                        return currentLineText === "/"
                    }}
                >
                    <button
                        className="flex items-center gap-2 p-1 rounded hover:bg-zinc-100 min-w-[280-px]"
                    >
                        <Image
                            width={100}
                            height={100}
                            src="https://www.notion.so/images/blocks/text/en-US.png"
                            alt="imagem ilustrativa"
                            className="w-12 border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Text</span>
                            <span className="text-xs text-zinc-400">Just start writing with plain text.</span>
                        </div>
                    </button>

                    <button
                        onClick={handleChangeForHeader}
                        className="flex items-center gap-2 p-2 rounded hover:bg-zinc-100 min-w-[280-px]"
                    >
                        <Image
                            width={100}
                            height={100}
                            src="https://www.notion.so/images/blocks/header.57a7576a.png"
                            alt="imagem ilustrativa"
                            className="w-12 border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">Header</span>
                            <span className="text-xs text-zinc-400">
                                Big section heading.
                            </span>
                        </div>
                    </button>
                </FloatingMenu>
            }
            {
                editor &&

                <BubbleMenu
                    editor={editor}
                    className="bg-zinc-50 flex shadow-xl border-zinc-50
                        shadow-black/20 rounded-sm overflow-hidden divide-x divide-zinc-100"
                >

                    <BubbleButton>
                        Text
                        <ChevronDown
                            className="w-4 h-4"
                        />
                    </BubbleButton>

                    <BubbleButton>
                        Comment
                        <MessageSquareText
                            className="w-4 h-4"
                        />
                    </BubbleButton>

                    <div className="flex items-center">

                        <BubbleButton
                            onClick={handleChangeForBold}
                            data-active={editor.isActive('bold')}
                        >
                            <Bold className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={handleChangeForItalic}
                            data-active={editor.isActive('italic')}
                        >
                            <Italic className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={handleChangeForStrike}
                            data-active={editor.isActive('strike')}
                        >
                            <Strikethrough className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={handleChangeForCode}
                            data-active={editor.isActive('code')}
                        >
                            <Code className="w-4 h-4" />
                        </BubbleButton>
                    </div>
                </BubbleMenu>
            }
        </>
    )
}

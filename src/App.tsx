import React, { useState, useCallback } from "react";
import {
  Edit3,
  Check,
  Trash2,
  Plus,
  Layout,
  X,
  Download,
  Copy,
  Folder,
  Eye,
  EyeOff,
  Type,
  Square,
  Box,
  AlignLeft,
  AlignCenter,
  AlignRight,
  FilePlus,
  Youtube,
} from "lucide-react";

/**
 * ------------------------------------------------------------------
 * 【 學生版發佈開關 】
 * ------------------------------------------------------------------
 */
const IS_RELEASED = false;

/**
 * 核心編輯組件：支援內容、字體大小與對齊，確保工具列 z-index 最高
 */
const EditableText = ({
  isEditMode,
  value,
  fontSize = 16,
  onSave,
  onSizeChange,
  className,
  multiline = false,
  isDark = false,
  align = "text-left",
}: any) => {
  if (IS_RELEASED || !isEditMode) {
    return (
      <div
        className={`py-0.5 px-1 min-h-[1.2em] whitespace-pre-wrap ${align} ${className}`}
        style={{ fontSize: `${fontSize}px` }}
      >
        {value}
      </div>
    );
  }

  const commonStyles = `w-full border rounded focus:ring-1 focus:ring-blue-400 outline-none transition-all font-bold ${align}`;
  const modeStyles = isDark
    ? "bg-blue-600 text-white border-blue-400 placeholder-blue-300"
    : "bg-white text-gray-800 border-slate-300";

  return (
    <div className="relative group/edit-container w-full">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white border-2 border-blue-500 rounded-lg shadow-2xl z-[999] px-2 py-1 opacity-0 group-focus-within/edit-container:opacity-100 transition-opacity pointer-events-auto scale-110">
        <Type size={14} className="text-blue-500" />
        <input
          type="number"
          value={fontSize}
          onChange={(e) => {
            e.stopPropagation();
            const val = parseInt(e.target.value);
            if (!isNaN(val)) onSizeChange(val);
          }}
          className="w-12 text-xs p-0 border-none focus:ring-0 text-slate-800 font-black bg-transparent"
          min="8"
          max="100"
        />
      </div>

      {multiline ? (
        <textarea
          className={`${commonStyles} ${modeStyles} ${className} resize-none py-1 px-1 block`}
          style={{ fontSize: `${fontSize}px` }}
          value={value}
          onChange={(e) => onSave(e.target.value)}
          rows={3}
        />
      ) : (
        <input
          type="text"
          className={`${commonStyles} ${modeStyles} ${className} py-0.5 px-1 block`}
          style={{ fontSize: `${fontSize}px` }}
          value={value}
          onChange={(e) => onSave(e.target.value)}
        />
      )}
    </div>
  );
};

const App = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // 完整同步您的 JSON 資料（已將 word 改為 docx）
  const initialDefaultData = {
    mainTitle: "選課專區",
    mainTitleSize: 42,
    mainSubtitle: "115 學年度第 1 學期 ",
    mainSubtitleSize: 22,
    mainAlign: "center",
    timelineGroups: [
      {
        id: "g1",
        type: "timeline",
        title: "選課時程概覽",
        titleSize: 32,
        subtitle: "SCHEDULE OVERVIEW",
        subtitleSize: 14,
        align: "left",
        sections: [
          {
            id: "s1",
            name: "暑假 / 寒假",
            nameSize: 24,
            borderRadius: 24,
            steps: [
              {
                id: "st1",
                tag: "第一次預選",
                tagSize: 17,
                dates: "8/24(一)~8/26(三)",
                dateSize: 15,
                note: "08/27(四)13:00後開放查詢。",
                noteSize: 12,
                width: 190,
                height: 220,
              },
              {
                id: "st3",
                tag: "第二次預選",
                tagSize: 17,
                dates: "8/28(五)~9/1(二)",
                dateSize: 15,
                note: "09/02(三)13:00後開放查詢。",
                noteSize: 12,
                width: 190,
                height: 220,
              },
            ],
          },
          {
            id: "s2",
            name: "第一、二週",
            nameSize: 24,
            borderRadius: 24,
            steps: [
              {
                id: "st5",
                tag: "網路加退選",
                tagSize: 17,
                dates: "9/7(一)~9/18(五)",
                dateSize: 15,
                note: "【必修課程退選或跨班修習表】表單受理至下午五點。",
                noteSize: 12,
                width: 190,
                height: 220,
              },
            ],
          },
          {
            id: "1778725625627",
            name: "第三週",
            nameSize: 24,
            borderRadius: 24,
            steps: [
              {
                id: "1778725635401",
                tag: "學生報告書",
                tagSize: 17,
                dates: "9/21(一)~9/24(四)",
                dateSize: 15,
                note: "紙本表單受理至下午五點。",
                noteSize: 11,
                width: 190,
                height: 220,
              },
            ],
          },
          {
            id: "1778746260660",
            name: "期中考前一周",
            nameSize: 24,
            borderRadius: 24,
            steps: [
              {
                id: "1778746265618",
                tag: "期中退選",
                tagSize: 17,
                dates: "10/27(二)~10/30(五)",
                dateSize: 15,
                note: "【期中考前一週退選】紙本表單受理至下午五點。",
                noteSize: 12,
                width: 200,
                height: 220,
              },
            ],
          },
        ],
      },
      {
        id: "g2",
        type: "resource_box",
        title: "選課常用表單及資源",
        titleSize: 30,
        subtitle: "COMMON RESOURCES",
        subtitleSize: 14,
        align: "left",
        categories: [
          {
            id: "cat1",
            name: "選課說明",
            nameSize: 20,
            enabled: { odt: true, pdf: true, docx: true, youtube: false },
            links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
            items: [
              {
                id: "f1",
                name: "選課注意事項（必看）",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: {
                  odt: "#",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E6%B3%95%E8%A6%8F%E8%88%87%E8%AA%AA%E6%98%8E/1.%E9%81%B8%E8%AA%B2%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85(%E8%AB%8B%EF%BC%8E%E4%B8%80%EF%BC%8E%E5%AE%9A%EF%BC%8E%E8%A6%81%EF%BC%8E%E7%9C%8B.pdf",
                  docx: "#",
                  youtube: "#",
                },
              },
              {
                id: "f2",
                name: "選課系統操作手冊",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
              },
              {
                id: "1778809175717",
                name: "修課學分數上下限規定",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
              },
              {
                id: "1778809205534",
                name: "選課問題Q&A",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
              },
              {
                id: "1778809216767",
                name: "選課懶人包",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
              },
              {
                id: "1778809231450",
                name: "授權碼說明",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
              },
            ],
          },
          {
            id: "1778809265000",
            name: "選課系統說明影音",
            nameSize: 20,
            enabled: { odt: false, pdf: false, docx: false, youtube: true },
            links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
            items: [
              {
                id: "1778809279366",
                name: "第1部  加選",
                nameSize: 18,
                enabled: { odt: false, pdf: false, docx: false, youtube: true },
                links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
              },
              {
                id: "1778809301449",
                name: "第2部  退選",
                nameSize: 18,
                enabled: { odt: false, pdf: false, docx: false, youtube: true },
                links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
              },
              {
                id: "1778821009359",
                name: " 第3部 授權碼選課",
                nameSize: 18,
                enabled: { odt: false, pdf: false, docx: false, youtube: true },
                links: {
                  odt: "#",
                  pdf: "#",
                  docx: "#",
                  youtube:
                    "https://www.youtube.com/watch?v=TVB85xs2Jus&list=PLOZcPD0-o8VqAiVa4BpJMnn3gHhjA3tUJ&index=3",
                },
              },
            ],
          },
          {
            id: "1778809266166",
            name: "選課法規",
            nameSize: 20,
            items: [
              {
                id: "1778809349910",
                name: "選課要點",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: {
                  odt: "#",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E6%95%99%E5%8B%99%E7%AB%A0%E5%89%87/%E8%AA%B2%E5%8B%99%E9%A1%9E/C03%E9%81%B8%E8%AA%B2%E8%A6%81%E9%BB%9E.pdf",
                  docx: "#",
                  youtube: "#",
                },
              },
              {
                id: "1778809364465",
                name: "其他未盡事宜，依本校「教務章則」相關規定辦理",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: {
                  odt: "#",
                  pdf: "https://aax.yuntech.edu.tw/index.php/2021-06-10-08-14-01",
                  docx: "#",
                  youtube: "#",
                },
              },
            ],
          },
          {
            id: "1778809418465",
            name: "表單下載區",
            nameSize: 20,
            items: [
              {
                id: "1778809425881",
                name: "必修科目退選或跨班修習申請表",
                nameSize: 18,
                enabled: { odt: true, pdf: true, docx: true, youtube: false },
                links: {
                  odt: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A81_%E5%BF%85%E4%BF%AE%E7%A7%91%E7%9B%AE%E9%80%80%E9%81%B8%E6%88%96%E8%B7%A8%E7%8F%AD%E4%BF%AE%E7%BF%92%E7%94%B3%E8%AB%8B%E8%A1%A8.odt",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A81_%E5%BF%85%E4%BF%AE%E7%A7%91%E7%9B%AE%E9%80%80%E9%81%B8%E6%88%96%E8%B7%A8%E7%8F%AD%E4%BF%AE%E7%BF%92%E7%94%B3%E8%AB%8B%E8%A1%A8.pdf",
                  docx: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A81_%E5%BF%85%E4%BF%AE%E7%A7%91%E7%9B%AE%E9%80%80%E9%81%B8%E6%88%96%E8%B7%A8%E7%8F%AD%E4%BF%AE%E7%BF%92%E7%94%B3%E8%AB%8B%E8%A1%A8.docx",
                  youtube: "#",
                },
              },
              {
                id: "1778809437248",
                name: "大學部成績優異超修學分申請書",
                nameSize: 18,
                enabled: { odt: true, pdf: true, docx: true, youtube: false },
                links: {
                  odt: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A82__%E5%A4%A7%E5%AD%B8%E9%83%A8%E6%88%90%E7%B8%BE%E5%84%AA%E7%95%B0%E8%B6%85%E4%BF%AE%E5%AD%B8%E5%88%86%E7%94%B3%E8%AB%8B%E6%9B%B8.odt",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A82__%E5%A4%A7%E5%AD%B8%E9%83%A8%E6%88%90%E7%B8%BE%E5%84%AA%E7%95%B0%E8%B6%85%E4%BF%AE%E5%AD%B8%E5%88%86%E7%94%B3%E8%AB%8B%E6%9B%B8.pdf",
                  docx: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A82__%E5%A4%A7%E5%AD%B8%E9%83%A8%E6%88%90%E7%B8%BE%E5%84%AA%E7%95%B0%E8%B6%85%E4%BF%AE%E5%AD%B8%E5%88%86%E7%94%B3%E8%AB%8B%E6%9B%B8.docx",
                  youtube: "#",
                },
              },
              {
                id: "1778809505447",
                name: "大學部減修學分申請書",
                nameSize: 18,
                enabled: { odt: true, pdf: true, docx: true, youtube: false },
                links: {
                  odt: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A83_%E5%A4%A7%E5%AD%B8%E9%83%A8%E6%B8%9B%E4%BF%AE%E5%AD%B8%E5%88%86%E7%94%B3%E8%AB%8B%E6%9B%B8.odt",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A83_%E5%A4%A7%E5%AD%B8%E9%83%A8%E6%B8%9B%E4%BF%AE%E5%AD%B8%E5%88%86%E7%94%B3%E8%AB%8B%E6%9B%B8.pdf",
                  docx: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A83_%E5%A4%A7%E5%AD%B8%E9%83%A8%E6%B8%9B%E4%BF%AE%E5%AD%B8%E5%88%86%E7%94%B3%E8%AB%8B%E6%9B%B8.doc",
                  youtube: "#",
                },
              },
              {
                id: "1778809530100",
                name: "學生報告書",
                nameSize: 18,
                enabled: { odt: true, pdf: true, docx: true, youtube: false },
                links: {
                  odt: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A84_%E5%AD%B8%E7%94%9F%E5%A0%B1%E5%91%8A%E6%9B%B8%20.odt",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A84_%E5%AD%B8%E7%94%9F%E5%A0%B1%E5%91%8A%E6%9B%B8%20.pdf",
                  docx: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A84_%E5%AD%B8%E7%94%9F%E5%A0%B1%E5%91%8A%E6%9B%B8%20.doc",
                  youtube: "#",
                },
              },
              {
                id: "1778809538367",
                name: "期中考前一週退選申請表",
                nameSize: 18,
                enabled: { odt: true, pdf: true, docx: true, youtube: false },
                links: {
                  odt: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A85_%E6%9C%9F%E4%B8%AD%E8%80%83%E5%89%8D%E4%B8%80%E9%80%B1%E9%80%80%E9%81%B8%E7%94%B3%E8%AB%8B%E8%A1%A8.odt",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A85_%E6%9C%9F%E4%B8%AD%E8%80%83%E5%89%8D%E4%B8%80%E9%80%B1%E9%80%80%E9%81%B8%E7%94%B3%E8%AB%8B%E8%A1%A8.pdf",
                  docx: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/%E8%A1%A85_%E6%9C%9F%E4%B8%AD%E8%80%83%E5%89%8D%E4%B8%80%E9%80%B1%E9%80%80%E9%81%B8%E7%94%B3%E8%AB%8B%E8%A1%A8.doc",
                  youtube: "#",
                },
              },
              {
                id: "1778809557564",
                name: "碩士在職專班修日間部3學分修習申請表",
                nameSize: 18,
                enabled: { odt: false, pdf: false, docx: true, youtube: false },
                links: {
                  odt: "",
                  pdf: "",
                  docx: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%A1%A8%E5%96%AE/6.%E7%A2%A9%E5%A3%AB%E5%9C%A8%E8%81%B7%E5%B0%88%E7%8F%AD%E4%BF%AE%E6%97%A5%E9%96%93%E9%83%A83%E5%AD%B8%E5%88%86%E4%BF%AE%E7%BF%92%E7%94%B3%E8%AB%8B%E8%A1%A8.docx",
                  youtube: "#",
                },
              },
            ],
          },
          {
            id: "1778809583566",
            name: "校際選課",
            nameSize: 20,
            items: [
              {
                id: "1778809618847",
                name: "校際選課實施要點",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: {
                  odt: "#",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E6%A0%A1%E9%9A%9B%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%AA%AA%E6%98%8E/1.%E6%A0%A1%E9%9A%9B%E9%81%B8%E8%AA%B2%E5%AF%A6%E6%96%BD%E8%A6%81%E9%BB%9E.pdf",
                  docx: "#",
                  youtube: "#",
                },
              },
              {
                id: "1778809649196",
                name: "校際選課申請表（本校至他校）",
                nameSize: 18,
                enabled: { odt: false, pdf: false, docx: true, youtube: false },
                links: {
                  odt: "#",
                  pdf: "#",
                  docx: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E6%A0%A1%E9%9A%9B%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%AA%AA%E6%98%8E/2.%E6%A0%A1%E9%9A%9B%E9%81%B8%E8%AA%B2%E7%94%B3%E8%AB%8B%E8%A1%A8(%E6%9C%AC%E6%A0%A1%E8%87%B3%E4%BB%96%E6%A0%A1).doc",
                  youtube: "#",
                },
              },
              {
                id: "1778809677464",
                name: "校際選課申請表（他校至本校）",
                nameSize: 18,
                enabled: { odt: false, pdf: false, docx: true, youtube: false },
                links: {
                  odt: "#",
                  pdf: "#",
                  docx: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E6%A0%A1%E9%9A%9B%E9%81%B8%E8%AA%B2%E7%9B%B8%E9%97%9C%E8%AA%AA%E6%98%8E/3.%E6%A0%A1%E9%9A%9B%E9%81%B8%E8%AA%B2%E7%94%B3%E8%AB%8B%E8%A1%A8(%E4%BB%96%E6%A0%A1%E8%87%B3%E6%9C%AC%E6%A0%A1).doc",
                  youtube: "#",
                },
              },
            ],
          },
          {
            id: "1778809704781",
            name: "暑修",
            nameSize: 20,
            items: [
              {
                id: "1778821214408",
                name: "暑期開班授課辦理要點",
                nameSize: 18,
                enabled: { odt: false, pdf: true, docx: false, youtube: false },
                links: {
                  odt: "#",
                  pdf: "https://aax.yuntech.edu.tw/images/content/%E9%81%B8%E8%AA%B2%E5%B0%88%E5%8D%80/%E6%9A%91%E4%BF%AE%E7%9B%B8%E9%97%9C%E8%AA%AA%E6%98%8E/1.%E6%9A%91%E6%9C%9F%E9%96%8B%E7%8F%AD%E6%8E%88%E8%AA%B2%E8%BE%A6%E7%90%86%E8%A6%81%E9%BB%9E.pdf",
                  docx: "#",
                  youtube: "#",
                },
              },
            ],
          },
        ],
      },
    ],
  };

  const [systemData, setSystemData] = useState(initialDefaultData);

  const updateField = (path: string[], value: any) => {
    setSystemData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {};
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const AlignmentControl = ({ currentAlign, onAlignChange }: any) => {
    if (!isEditMode || IS_RELEASED) return null;
    return (
      <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm ml-4 self-center scale-90">
        <button
          onClick={() => onAlignChange("left")}
          className={`p-1 rounded ${
            currentAlign === "left"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-slate-50"
          }`}
        >
          <AlignLeft size={14} />
        </button>
        <button
          onClick={() => onAlignChange("center")}
          className={`p-1 rounded ${
            currentAlign === "center"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-slate-50"
          }`}
        >
          <AlignCenter size={14} />
        </button>
        <button
          onClick={() => onAlignChange("right")}
          className={`p-1 rounded ${
            currentAlign === "right"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-slate-50"
          }`}
        >
          <AlignRight size={14} />
        </button>
      </div>
    );
  };

  const getAlignClass = (align: string) => {
    if (align === "center") return "text-center items-center justify-center";
    if (align === "right") return "text-right items-end justify-end";
    return "text-left items-start justify-start";
  };

  /**
   * 改進版匯出：使用穩定性最高的 document.execCommand 以相容 iframe 環境
   */
  const handleExportData = () => {
    const dataStr = JSON.stringify(systemData, null, 2);
    const textArea = document.createElement("textarea");
    textArea.value = dataStr;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setShowExportModal(true);
      setTimeout(() => setShowExportModal(false), 3000);
    } catch (err) {
      console.error("匯出失敗", err);
    }

    document.body.removeChild(textArea);
  };

  const FILE_FORMATS = ["odt", "pdf", "docx", "youtube"];

  const getFormatLabel = (fmt: string) => {
    if (fmt === "youtube") return "YT";
    if (fmt === "docx") return "DOCX";
    return fmt.toUpperCase();
  };

  const getFormatStyle = (fmt: string) => {
    switch (fmt) {
      case "odt":
        return "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white";
      case "pdf":
        return "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white";
      case "docx":
        return "bg-sky-50 text-sky-600 border-sky-100 hover:bg-sky-600 hover:text-white";
      case "youtube":
        return "bg-red-600 text-white border-red-700 hover:bg-red-700 shadow-red-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-600 hover:text-white";
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 pb-20 overflow-x-hidden">
      {!IS_RELEASED && (
        <div className="fixed top-4 right-4 z-[1000] flex gap-2">
          {isEditMode && (
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full shadow-lg bg-slate-800 text-white hover:bg-black transition-all"
            >
              <Download size={16} />
              <span className="font-bold text-xs">匯出 JSON</span>
            </button>
          )}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 px-5 py-1.5 rounded-full shadow-lg transition-all active:scale-95 ${
              isEditMode
                ? "bg-green-600 text-white"
                : "bg-blue-900 text-white opacity-40 hover:opacity-100"
            }`}
          >
            {isEditMode ? <Check size={18} /> : <Edit3 size={18} />}
            <span className="font-bold text-xs">
              {isEditMode ? "完成" : "編輯"}
            </span>
          </button>
        </div>
      )}

      {showExportModal && (
        <div className="fixed top-20 right-4 z-[1000] animate-bounce">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-2xl flex items-center gap-2 text-sm font-bold">
            <Copy size={16} /> 資料已複製，請貼回程式碼儲存！
          </div>
        </div>
      )}

      <header className="pt-12 pb-8 px-10 max-w-[1600px] mx-auto border-b border-slate-100 mb-8">
        <div
          className={`flex flex-col ${getAlignClass(
            systemData.mainAlign || "center"
          )}`}
        >
          <div className="flex items-center w-fit max-w-full">
            <EditableText
              isEditMode={isEditMode}
              value={systemData.mainTitle}
              fontSize={systemData.mainTitleSize}
              onSave={(v: string) => updateField(["mainTitle"], v)}
              onSizeChange={(s: number) => updateField(["mainTitleSize"], s)}
              className="font-black text-blue-950 tracking-tighter"
              align={
                systemData.mainAlign === "center"
                  ? "text-center"
                  : systemData.mainAlign === "right"
                  ? "text-right"
                  : "text-left"
              }
            />
            <AlignmentControl
              currentAlign={systemData.mainAlign}
              onAlignChange={(a: string) => updateField(["mainAlign"], a)}
            />
          </div>
          <EditableText
            isEditMode={isEditMode}
            value={systemData.mainSubtitle}
            fontSize={systemData.mainSubtitleSize}
            onSave={(v: string) => updateField(["mainSubtitle"], v)}
            onSizeChange={(s: number) => updateField(["mainSubtitleSize"], s)}
            className="text-blue-600/50 font-bold"
            align={
              systemData.mainAlign === "center"
                ? "text-center"
                : systemData.mainAlign === "right"
                ? "text-right"
                : "text-left"
            }
          />
        </div>
      </header>

      {systemData.timelineGroups.map((group, gIdx) => (
        <div
          key={group.id}
          className="mb-16 animate-fadeIn px-10 max-w-[1600px] mx-auto"
        >
          <div
            className={`flex flex-row items-baseline border-b-2 border-blue-900/10 pb-2 mb-8 relative ${getAlignClass(
              group.align || "left"
            )}`}
          >
            <EditableText
              isEditMode={isEditMode}
              value={group.title}
              fontSize={group.titleSize}
              onSave={(v: string) =>
                updateField(["timelineGroups", gIdx.toString(), "title"], v)
              }
              onSizeChange={(s: number) =>
                updateField(["timelineGroups", gIdx.toString(), "titleSize"], s)
              }
              className="font-black text-slate-800 flex-shrink-0"
              align="text-left"
            />
            <EditableText
              isEditMode={isEditMode}
              value={group.subtitle}
              fontSize={group.subtitleSize}
              onSave={(v: string) =>
                updateField(["timelineGroups", gIdx.toString(), "subtitle"], v)
              }
              onSizeChange={(s: number) =>
                updateField(
                  ["timelineGroups", gIdx.toString(), "subtitleSize"],
                  s
                )
              }
              className="text-blue-500 font-black uppercase tracking-[0.2em] whitespace-nowrap ml-4"
              align="text-left"
            />
            <AlignmentControl
              currentAlign={group.align}
              onAlignChange={(a: string) =>
                updateField(["timelineGroups", gIdx.toString(), "align"], a)
              }
            />
          </div>

          {group.type === "resource_box" ? (
            <div className="flex flex-col gap-6">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-4">
                {group.categories?.map((cat: any, cIdx: number) => (
                  <div
                    key={cat.id}
                    className="break-inside-avoid bg-white rounded-[24px] border border-slate-100 shadow-lg flex flex-col overflow-hidden hover:border-blue-100 transition-all mb-4"
                  >
                    <div
                      className="p-4 border-b border-slate-100"
                      style={{ backgroundColor: "rgb(237, 240, 242)" }}
                    >
                      <div className="flex justify-between items-center">
                        <EditableText
                          isEditMode={isEditMode}
                          value={cat.name}
                          fontSize={cat.nameSize}
                          onSave={(v: string) =>
                            updateField(
                              [
                                "timelineGroups",
                                gIdx.toString(),
                                "categories",
                                cIdx.toString(),
                                "name",
                              ],
                              v
                            )
                          }
                          onSizeChange={(s: number) =>
                            updateField(
                              [
                                "timelineGroups",
                                gIdx.toString(),
                                "categories",
                                cIdx.toString(),
                                "nameSize",
                              ],
                              s
                            )
                          }
                          className="font-black text-blue-950 uppercase tracking-wide"
                          align="text-left"
                        />
                        {isEditMode && (
                          <button
                            onClick={() => {
                              const newCats = [...group.categories];
                              newCats.splice(cIdx, 1);
                              updateField(
                                [
                                  "timelineGroups",
                                  gIdx.toString(),
                                  "categories",
                                ],
                                newCats
                              );
                            }}
                            className="text-red-300 hover:text-red-500 ml-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-white">
                      {cat.items?.map((item: any, iIdx: number) => (
                        <div
                          key={item.id}
                          className="group/item border-b border-slate-50 pb-2 last:border-0"
                        >
                          {/* 檔名與標籤容器：支援換行與條件式顯示 */}
                          <div className="flex items-start flex-wrap gap-x-2 gap-y-1 w-full">
                            <div className="flex-1 min-w-0">
                              <EditableText
                                isEditMode={isEditMode}
                                value={item.name}
                                fontSize={item.nameSize}
                                onSave={(v: string) =>
                                  updateField(
                                    [
                                      "timelineGroups",
                                      gIdx.toString(),
                                      "categories",
                                      cIdx.toString(),
                                      "items",
                                      iIdx.toString(),
                                      "name",
                                    ],
                                    v
                                  )
                                }
                                onSizeChange={(s: number) =>
                                  updateField(
                                    [
                                      "timelineGroups",
                                      gIdx.toString(),
                                      "categories",
                                      cIdx.toString(),
                                      "items",
                                      iIdx.toString(),
                                      "nameSize",
                                    ],
                                    s
                                  )
                                }
                                className="font-bold text-slate-700 break-words"
                                align="text-left"
                              />
                            </div>

                            {/* 只有在有格式被啟用時才顯示標籤區域 */}
                            {FILE_FORMATS.some(
                              (fmt) => item.enabled?.[fmt]
                            ) && (
                              <div className="flex gap-1 items-center flex-shrink-0 mt-0.5">
                                {FILE_FORMATS.map(
                                  (fmt) =>
                                    item.enabled?.[fmt] && (
                                      <a
                                        key={fmt}
                                        href={item.links?.[fmt] || "#"}
                                        target="_blank"
                                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border transition-all shadow-sm ${getFormatStyle(
                                          fmt
                                        )}`}
                                      >
                                        {getFormatLabel(fmt)}
                                      </a>
                                    )
                                )}
                              </div>
                            )}

                            {isEditMode && (
                              <button
                                onClick={() => {
                                  const newItems = [...cat.items];
                                  newItems.splice(iIdx, 1);
                                  updateField(
                                    [
                                      "timelineGroups",
                                      gIdx.toString(),
                                      "categories",
                                      cIdx.toString(),
                                      "items",
                                    ],
                                    newItems
                                  );
                                }}
                                className="text-red-200 hover:text-red-500 ml-auto opacity-0 group-hover/item:opacity-100"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>

                          {isEditMode && (
                            <div className="w-full grid grid-cols-1 gap-1 mt-2 pt-2 border-t border-dashed border-slate-100">
                              {FILE_FORMATS.map((fmt) => (
                                <div
                                  key={fmt}
                                  className="flex items-center gap-1"
                                >
                                  <span
                                    className={`text-[10px] font-bold uppercase w-12 ${
                                      fmt === "youtube"
                                        ? "text-red-500"
                                        : "text-slate-400"
                                    }`}
                                  >
                                    {getFormatLabel(fmt)}
                                  </span>
                                  <input
                                    type="text"
                                    placeholder={`${fmt} URL`}
                                    value={item.links?.[fmt] || ""}
                                    onChange={(e) =>
                                      updateField(
                                        [
                                          "timelineGroups",
                                          gIdx.toString(),
                                          "categories",
                                          cIdx.toString(),
                                          "items",
                                          iIdx.toString(),
                                          "links",
                                          fmt,
                                        ],
                                        e.target.value
                                      )
                                    }
                                    className="flex-grow bg-slate-50 border rounded px-2 py-1 text-[10px]"
                                  />
                                  <button
                                    onClick={() =>
                                      updateField(
                                        [
                                          "timelineGroups",
                                          gIdx.toString(),
                                          "categories",
                                          cIdx.toString(),
                                          "items",
                                          iIdx.toString(),
                                          "enabled",
                                          fmt,
                                        ],
                                        !item.enabled?.[fmt]
                                      )
                                    }
                                    className="text-slate-400 p-1"
                                  >
                                    {" "}
                                    {item.enabled?.[fmt] ? (
                                      <Eye size={12} />
                                    ) : (
                                      <EyeOff size={12} />
                                    )}{" "}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {isEditMode && (
                        <button
                          onClick={() => {
                            const newItem = {
                              id: Date.now().toString(),
                              name: "新資源項目",
                              nameSize: 18,
                              enabled: {
                                odt: true,
                                pdf: true,
                                docx: true,
                                youtube: true,
                              },
                              links: {
                                odt: "#",
                                pdf: "#",
                                docx: "#",
                                youtube: "#",
                              },
                            };
                            updateField(
                              [
                                "timelineGroups",
                                gIdx.toString(),
                                "categories",
                                cIdx.toString(),
                                "items",
                              ],
                              [...(cat.items || []), newItem]
                            );
                          }}
                          className="w-full py-2 border-2 border-dashed border-slate-100 rounded-xl text-slate-300 hover:text-blue-400 hover:border-blue-100 flex items-center justify-center gap-2"
                        >
                          <FilePlus size={16} />{" "}
                          <span className="text-xs font-bold">新增檔案</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {isEditMode && (
                <button
                  onClick={() => {
                    const newCat = {
                      id: Date.now().toString(),
                      name: "新資源分類",
                      nameSize: 20,
                      enabled: {
                        odt: true,
                        pdf: true,
                        docx: true,
                        youtube: true,
                      },
                      links: { odt: "#", pdf: "#", docx: "#", youtube: "#" },
                      items: [],
                    };
                    updateField(
                      ["timelineGroups", gIdx.toString(), "categories"],
                      [...(group.categories || []), newCat]
                    );
                  }}
                  className="w-full py-3 border-4 border-dashed border-slate-100 rounded-[24px] text-slate-300 hover:text-blue-500 hover:border-blue-100 flex flex-col items-center justify-center gap-1 opacity-50 hover:opacity-100"
                >
                  <Plus size={24} />{" "}
                  <span className="text-xs font-black uppercase tracking-widest">
                    新增類別區塊
                  </span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-y-12 gap-x-1 justify-center items-start w-full">
              {group.sections?.map((section: any, sIdx: number) => (
                <div
                  key={section.id}
                  className="flex flex-col items-center flex-grow-0 max-w-full"
                >
                  <div className="py-1 px-4 mb-8 border-b-2 border-blue-900/10 min-w-[120px] text-center relative">
                    <EditableText
                      isEditMode={isEditMode}
                      value={section.name}
                      fontSize={section.nameSize}
                      onSave={(v: string) =>
                        updateField(
                          [
                            "timelineGroups",
                            gIdx.toString(),
                            "sections",
                            sIdx.toString(),
                            "name",
                          ],
                          v
                        )
                      }
                      onSizeChange={(s: number) =>
                        updateField(
                          [
                            "timelineGroups",
                            gIdx.toString(),
                            "sections",
                            sIdx.toString(),
                            "nameSize",
                          ],
                          s
                        )
                      }
                      className="font-black text-blue-900"
                      align="text-center"
                    />
                    {isEditMode && !IS_RELEASED && (
                      <button
                        onClick={() =>
                          updateField(
                            [
                              "timelineGroups",
                              gIdx.toString(),
                              "sections",
                              sIdx.toString(),
                              "borderRadius",
                            ],
                            section.borderRadius === 0 ? 24 : 0
                          )
                        }
                        className="absolute -right-4 top-1 bg-white border border-slate-200 text-slate-400 p-1 rounded-md shadow scale-75 hover:text-blue-600"
                      >
                        {section.borderRadius === 0 ? (
                          <Box size={14} />
                        ) : (
                          <Square size={14} />
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center items-start w-full">
                    {section.steps?.map((step: any, stIdx: number) => (
                      <div
                        key={step.id}
                        className="p-4 flex flex-col text-left relative border border-slate-200 shadow-lg shadow-slate-200/40 transition-all hover:shadow-xl overflow-hidden group/step"
                        style={{
                          borderRadius: `${section.borderRadius || 24}px`,
                          backgroundColor: "rgb(237, 240, 242)",
                          width: `${step.width || 190}px`,
                          height: `${step.height || 220}px`,
                        }}
                      >
                        {isEditMode && !IS_RELEASED && (
                          <>
                            <button
                              onClick={() => {
                                const newSteps = [...section.steps];
                                newSteps.splice(stIdx, 1);
                                updateField(
                                  [
                                    "timelineGroups",
                                    gIdx.toString(),
                                    "sections",
                                    sIdx.toString(),
                                    "steps",
                                  ],
                                  newSteps
                                );
                              }}
                              className="absolute top-1 right-1 text-red-500 bg-white/90 shadow rounded-full p-1.5 z-10 opacity-0 group-hover/step:opacity-100 transition-opacity hover:bg-red-50"
                            >
                              <Trash2 size={12} />
                            </button>
                            <div className="absolute bottom-1 right-1 flex flex-col gap-1 z-20 opacity-0 group-hover/step:opacity-100 transition-opacity">
                              <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded px-1 border border-slate-200">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">
                                  W
                                </span>
                                <input
                                  type="number"
                                  value={step.width || 190}
                                  onChange={(e) =>
                                    updateField(
                                      [
                                        "timelineGroups",
                                        gIdx.toString(),
                                        "sections",
                                        sIdx.toString(),
                                        "steps",
                                        stIdx.toString(),
                                        "width",
                                      ],
                                      parseInt(e.target.value) || 100
                                    )
                                  }
                                  className="w-8 text-[9px] p-0 border-none bg-transparent focus:ring-0 text-blue-600 font-bold"
                                />
                              </div>
                              <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded px-1 border border-slate-200">
                                <span className="text-[8px] font-bold text-slate-400 uppercase">
                                  H
                                </span>
                                <input
                                  type="number"
                                  value={step.height || 220}
                                  onChange={(e) =>
                                    updateField(
                                      [
                                        "timelineGroups",
                                        gIdx.toString(),
                                        "sections",
                                        sIdx.toString(),
                                        "steps",
                                        stIdx.toString(),
                                        "height",
                                      ],
                                      parseInt(e.target.value) || 100
                                    )
                                  }
                                  className="w-8 text-[9px] p-0 border-none bg-transparent focus:ring-0 text-blue-600 font-bold"
                                />
                              </div>
                            </div>
                          </>
                        )}
                        <div
                          className="bg-blue-600 text-white px-2 py-1 font-black mb-4 w-fit shadow-md min-h-[1.5em]"
                          style={{ borderRadius: `8px` }}
                        >
                          <EditableText
                            isEditMode={isEditMode}
                            value={step.tag}
                            fontSize={step.tagSize}
                            onSave={(v: string) =>
                              updateField(
                                [
                                  "timelineGroups",
                                  gIdx.toString(),
                                  "sections",
                                  sIdx.toString(),
                                  "steps",
                                  stIdx.toString(),
                                  "tag",
                                ],
                                v
                              )
                            }
                            onSizeChange={(s: number) =>
                              updateField(
                                [
                                  "timelineGroups",
                                  gIdx.toString(),
                                  "sections",
                                  sIdx.toString(),
                                  "steps",
                                  stIdx.toString(),
                                  "tagSize",
                                ],
                                s
                              )
                            }
                            className="w-full"
                            isDark={true}
                            align="text-center"
                          />
                        </div>
                        <div className="w-full flex-grow overflow-y-auto scrollbar-hide space-y-2">
                          <EditableText
                            isEditMode={isEditMode}
                            value={step.dates}
                            fontSize={step.dateSize}
                            onSave={(v: string) =>
                              updateField(
                                [
                                  "timelineGroups",
                                  gIdx.toString(),
                                  "sections",
                                  sIdx.toString(),
                                  "steps",
                                  stIdx.toString(),
                                  "dates",
                                ],
                                v
                              )
                            }
                            onSizeChange={(s: number) =>
                              updateField(
                                [
                                  "timelineGroups",
                                  gIdx.toString(),
                                  "sections",
                                  sIdx.toString(),
                                  "steps",
                                  stIdx.toString(),
                                  "dateSize",
                                ],
                                s
                              )
                            }
                            className="text-slate-900 font-black leading-tight tracking-tight"
                            align="text-left"
                          />
                          <EditableText
                            isEditMode={isEditMode}
                            value={step.note}
                            fontSize={step.noteSize}
                            onSave={(v: string) =>
                              updateField(
                                [
                                  "timelineGroups",
                                  gIdx.toString(),
                                  "sections",
                                  sIdx.toString(),
                                  "steps",
                                  stIdx.toString(),
                                  "note",
                                ],
                                v
                              )
                            }
                            onSizeChange={(s: number) =>
                              updateField(
                                [
                                  "timelineGroups",
                                  gIdx.toString(),
                                  "sections",
                                  sIdx.toString(),
                                  "steps",
                                  stIdx.toString(),
                                  "noteSize",
                                ],
                                s
                              )
                            }
                            className="text-slate-500 font-bold leading-snug break-words opacity-80"
                            multiline={true}
                            align="text-left"
                          />
                        </div>
                      </div>
                    ))}
                    {isEditMode && !IS_RELEASED && (
                      <button
                        onClick={() => {
                          const newStep = {
                            id: Date.now().toString(),
                            tag: "新步驟",
                            tagSize: 17,
                            dates: "00/00",
                            dateSize: 15,
                            note: "",
                            noteSize: 12,
                            width: 190,
                            height: 220,
                          };
                          updateField(
                            [
                              "timelineGroups",
                              gIdx.toString(),
                              "sections",
                              sIdx.toString(),
                              "steps",
                            ],
                            [...(section.steps || []), newStep]
                          );
                        }}
                        className="w-12 min-h-[220px] border-4 border-dashed border-slate-200 rounded-[20px] flex items-center justify-center text-slate-300 hover:text-blue-500 transition-all hover:bg-blue-50/20"
                      >
                        <Plus size={24} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&display=swap');
        body { font-family: 'Noto Sans TC', sans-serif; overflow-x: hidden; background-color: #ffffff; letter-spacing: -0.01em; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;
